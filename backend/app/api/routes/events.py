from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, require_role
from app.schemas.event import EventCreate, EventUpdate, EventResponse
from app.services.event_service import (
    create_event,
    get_all_events,
    get_event_by_id,
    update_event,
    delete_event,
)

router = APIRouter(prefix="/events", tags=["Events"])


@router.post("", response_model=EventResponse)
def create_new_event(
    data: EventCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    return create_event(db, data)


@router.get("", response_model=list[EventResponse])
def list_events(db: Session = Depends(get_db)):
    return get_all_events(db)


@router.get("/{event_id}", response_model=EventResponse)
def get_single_event(event_id: int, db: Session = Depends(get_db)):
    return get_event_by_id(db, event_id)


@router.put("/{event_id}", response_model=EventResponse)
def edit_event(
    event_id: int,
    data: EventUpdate,
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    return update_event(db, event_id, data)


@router.delete("/{event_id}")
def remove_event(
    event_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_role("admin")),
):
    return delete_event(db, event_id)