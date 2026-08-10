from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.document import router as document_router
from starlette.middleware.sessions import SessionMiddleware
from app.core.config import settings
from app.api.auth import router as auth_router

from app.routers.dashboard import router as dashboard_user

from app.routers.chat_router import router as chat_router
from app.api.user import router as user_router
app=FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG

)


#session middleware (required for google auth)
# Session middleware
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.JWT_SECRET_KEY
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#document router
app.include_router(document_router)
#chat router
app.include_router(chat_router)
#include router
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(dashboard_user)
@app.get("/")
def root():
    
    return {
        "message":"welcome to DocuChat AI",
        "debug":settings.APP_VERSION
    }




@app.get("/health")
def health_check():
    return {
        "status":"healthy",
        "application":settings.APP_NAME
    }