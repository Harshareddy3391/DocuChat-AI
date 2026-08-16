from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.chat_services import chat_with_document
from app.dependencies.auth import get_current_user
from app.models.user_model import User


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Ask questions about an uploaded document.
    """

    answer = chat_with_document(
        db=db,
        document_id=request.document_id,
        qustion=request.question,
        current_user=current_user
    )

    return ChatResponse(
        answer=answer
    )