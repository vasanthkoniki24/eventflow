from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, require_role
from app.models.event import Event
from app.models.booking import Booking
from app.services.booking_service import cancel_booking
from app.schemas.booking import BookingResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/analytics/events")
def event_analytics(
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    total_events = db.query(func.count(Event.id)).scalar() or 0
    total_bookings = db.query(func.count(Booking.id)).scalar() or 0
    confirmed_bookings = db.query(func.count(Booking.id)).filter(Booking.status == "confirmed").scalar() or 0
    cancelled_bookings = db.query(func.count(Booking.id)).filter(Booking.status == "cancelled").scalar() or 0

    return {
        "total_events": total_events,
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed_bookings,
        "cancelled_bookings": cancelled_bookings,
    }


@router.get("/analytics/revenue")
def revenue_analytics(
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    total_revenue = (
        db.query(func.coalesce(func.sum(Booking.total_amount), 0))
        .filter(Booking.payment_status == "paid")
        .scalar()
    )

    return {"total_revenue": total_revenue}


@router.post("/bookings/{booking_id}/cancel", response_model=BookingResponse)
def cancel_booking_by_admin(
    booking_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    return cancel_booking(db, booking_id, admin)