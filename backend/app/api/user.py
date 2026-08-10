from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.models.document_model import Document
from app.dependencies.auth import get_current_user
from app.db.database import get_db
from app.models.user_model import User

router=APIRouter(prefix="/users",tags=["Users"])

@router.get("/me")
def get_me(current_user:User=Depends(get_current_user)):


    return {
        "id":current_user.id,
        "name":current_user.name,
        "email":current_user.email,
        "picture":current_user.picture
    }

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document_count = db.query(Document).filter(
        Document.user_id == current_user.id
    ).count()

    return {

        "documents": document_count,

        "chats": 0,

        "storage": "0 MB"

    }
