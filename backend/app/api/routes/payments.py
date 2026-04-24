from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.payment import CheckoutSessionRequest, CheckoutSessionResponse
from app.services.payment_service import create_checkout_session, handle_stripe_webhook

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("/create-session", response_model=CheckoutSessionResponse)
def create_session(
    data: CheckoutSessionRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_checkout_session(db, data.booking_id, current_user)


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    return await handle_stripe_webhook(request, db)