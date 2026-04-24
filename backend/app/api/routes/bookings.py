from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.booking import BookingCreate, BookingResponse, BookingDetailResponse
from app.services.booking_service import (
    create_booking,
    get_all_bookings,
    get_booking_by_id,
    get_my_bookings,
)

router = APIRouter(tags=["Bookings"])


@router.post("/bookings", response_model=BookingResponse)
def create_new_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_booking(db, current_user, data.event_id, data.quantity)


@router.get("/bookings", response_model=list[BookingDetailResponse])
def list_bookings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_all_bookings(db, current_user)




@router.get("/my-bookings", response_model=list[BookingResponse])
def list_my_bookings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_my_bookings(db, current_user)




@router.get("/bookings/{booking_id}", response_model=BookingDetailResponse)
def get_single_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_booking_by_id(db, booking_id, current_user)