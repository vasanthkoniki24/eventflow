import stripe
from fastapi import HTTPException, Request
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.notification import Notification

stripe.api_key = settings.STRIPE_SECRET_KEY


def create_checkout_session(db: Session, booking_id: int, current_user):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": f"Booking #{booking.id}",
                    },
                    "unit_amount": int(round(booking.total_amount * 100,
    ))},
                "quantity": 1,
            }
        ],
        mode="payment",
        success_url=f"{settings.FRONTEND_URL}/booking-success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.FRONTEND_URL}/booking-cancel",
        metadata={"booking_id": str(booking.id)},
    )

    payment = db.query(Payment).filter(Payment.booking_id == booking.id).first()
    if not payment:
        payment = Payment(
            booking_id=booking.id,
            stripe_session_id=session.id,
            amount=booking.total_amount,
            currency="usd",
            status="pending",
        )
        db.add(payment)
    else:
        payment.stripe_session_id = session.id
        payment.amount = booking.total_amount
        payment.status = "pending"

    db.commit()

    return {
        "checkout_url": session.url,
        "session_id": session.id,
    }


async def handle_stripe_webhook(request: Request, db: Session):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=sig_header,
            secret=settings.STRIPE_WEBHOOK_SECRET,
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid webhook payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    if event["type"] == "checkout.session.completed":
        session_data = event["data"]["object"]
        booking_id = int(session_data["metadata"]["booking_id"])

        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        payment = db.query(Payment).filter(Payment.booking_id == booking_id).first()

        if booking:
            booking.payment_status = "paid"

        if payment:
            payment.status = "paid"
            payment.stripe_payment_intent = (
                session_data["payment_intent"] if "payment_intent" in session_data else None
                )

        if booking:
            notification = Notification(
                user_id=booking.user_id,
                message=f"Payment successful for booking #{booking.id}.",
            )
            db.add(notification)

        db.commit()

    return {"message": "Webhook received successfully"}