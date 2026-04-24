from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate


def create_event(db: Session, data: EventCreate):
    event = Event(
        title=data.title,
        description=data.description,
        location=data.location,
        category=data.category,
        banner_image=data.banner_image,
        event_date=data.event_date,
        price=data.price,
        total_tickets=data.total_tickets,
        available_tickets=data.total_tickets,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_all_events(db: Session):
    return db.query(Event).order_by(Event.event_date.desc()).all()


def get_event_by_id(db: Session, event_id: int):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


def update_event(db: Session, event_id: int, data: EventUpdate):
    event = get_event_by_id(db, event_id)

    old_total = event.total_tickets
    old_available = event.available_tickets
    sold_count = old_total - old_available

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(event, key, value)

    if data.total_tickets is not None:
        if data.total_tickets < sold_count:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Total tickets cannot be less than already booked tickets",
            )
        event.available_tickets = data.total_tickets - sold_count

    db.commit()
    db.refresh(event)
    return event


def delete_event(db: Session, event_id: int):
    event = get_event_by_id(db, event_id)
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}