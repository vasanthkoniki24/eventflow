from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes.auth import router as auth_router
from app.api.routes.events import router as events_router
from app.api.routes.bookings import router as bookings_router
from app.api.routes.payments import router as payments_router
from app.api.routes.notifications import router as notifications_router
from app.api.routes.admin import router as admin_router
from app.db.init_db import init_db



@asynccontextmanager 
async def lifespan(app: FastAPI):
    # init_db()
    yield



app = FastAPI(title=settings.APP_NAME,
              lifespan=lifespan,
              docs_url="/docs",
              redoc_url="/redoc",)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def root():
    return {"message": f"{settings.APP_NAME} is running"}


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}



app.include_router(auth_router)
app.include_router(events_router)
app.include_router(bookings_router)
app.include_router(payments_router)
app.include_router(notifications_router)
app.include_router(admin_router)