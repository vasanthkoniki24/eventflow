from pydantic import BaseModel
from datetime import datetime
from app.schemas.event import EventResponse
from app.schemas.user import UserResponse


class BookingCreate(BaseModel):
    event_id: int
    quantity: int


class BookingResponse(BaseModel):
    id: int
    user_id: int
    event_id: int
    quantity: int
    total_amount: float
    status: str
    payment_status: str
    created_at: datetime | None = None

    class Config:
        from_attributes = True


class BookingDetailResponse(BookingResponse):
    user: UserResponse
    event: EventResponse