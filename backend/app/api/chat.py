from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user_model import User
from app.services.chat_services import chat_with_document


router=APIRouter(prefix="/chat",
                 tags=['chat']
                 )


@router.post("/{document_id}")
def chat(
    document_id:int,
    qustion:str,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):


    answer=chat_with_document(
        db=db,
        document_id=document_id,
        qustion=qustion

    )

    return {
        "qustion":qustion,
        "answer":answer
    }


