from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user_model import User
from app.dependencies.auth import get_current_user
from app.models.document_model import Document

router=APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



@router.get("/stats")
def get_dashboard_stats(
        db:Session=Depends(get_db),
        current_user:User=Depends(get_current_user)
):

    documents_count=db.query(Document).filter(Document.user_id == current_user).count()
    return [
    {
        "title": "Documents",
        "value": documents_count
    },
    {
        "title": "AI Chats",
        "value": 0
    },
    {
        "title": "Storage",
        "value": "0 MB"
    },
    {
        "title": "AI Responses",
        "value": 0
    }
]