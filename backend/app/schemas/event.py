from pydantic import BaseModel
from datetime import datetime


class EventCreate(BaseModel):
    title: str
    description: str | None = None
    location: str
    category: str | None = None
    banner_image: str | None = None
    event_date: datetime
    price: float
    total_tickets: int


class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    category: str | None = None
    banner_image: str | None = None
    event_date: datetime | None = None
    price: float | None = None
    total_tickets: int | None = None


class EventResponse(BaseModel):
    id: int
    title: str
    description: str | None
    location: str
    category: str | None
    banner_image: str | None
    event_date: datetime
    price: float
    total_tickets: int
    available_tickets: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True