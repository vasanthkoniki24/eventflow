from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.models.booking import Booking
from app.models.event import Event
from app.models.notification import Notification
from app.models.user import User


def create_booking(db: Session, current_user: User, event_id: int, quantity: int):
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    event = db.query(Event).filter(Event.id == event_id).with_for_update().first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.available_tickets < quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough tickets available",
        )

    total_amount = round(event.price * quantity, 2)
    event.available_tickets -= quantity

    booking = Booking(
        user_id=current_user.id,
        event_id=event.id,
        quantity=quantity,
        total_amount=total_amount,
        status="confirmed",
        payment_status="pending",
    )
    db.add(booking)
    db.flush()

    notification = Notification(
        user_id=current_user.id,
        message=f"Your booking for '{event.title}' has been created.",
    )
    db.add(notification)

    db.commit()
    db.refresh(booking)
    return booking


def get_all_bookings(db: Session, current_user: User):
    if current_user.role == "admin":
        return (
            db.query(Booking)
            .options(joinedload(Booking.user), joinedload(Booking.event))
            .order_by(Booking.created_at.asc())
            .all()
        )

    return (
        db.query(Booking)
        .options(joinedload(Booking.user), joinedload(Booking.event))
        .filter(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.asc())
        .all()
    )


def get_booking_by_id(db: Session, booking_id: int, current_user: User):
    booking = (
        db.query(Booking)
        .options(joinedload(Booking.user), joinedload(Booking.event))
        .filter(Booking.id == booking_id)
        .first()
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    return booking


def get_my_bookings(db: Session, current_user: User):
    return (
        db.query(Booking)
        .options(joinedload(Booking.event))
        .filter(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.asc())
        .all()
    )


def cancel_booking(db: Session, booking_id: int, current_user=None):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if current_user and current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    if booking.status == "cancelled":
        raise HTTPException(status_code=400, detail="Booking already cancelled")

    event = db.query(Event).filter(Event.id == booking.event_id).first()
    if event:
        event.available_tickets += booking.quantity

    booking.status = "cancelled"
    booking.payment_status = "refunded"

    notification = Notification(
        user_id=booking.user_id,
        message=f"Your booking #{booking.id} has been cancelled by admin.",
    )
    db.add(notification)

    db.commit()
    db.refresh(booking)
    return booking