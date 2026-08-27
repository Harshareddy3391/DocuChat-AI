from openai import OpenAI
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


from app.core.config import settings
from app.models.user_model import User
from app.models.document_model import Document

from app.services.search_service import search_similar_chunks


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def chat_with_document(
        db: Session,
        document_id: int,
        qustion: str,
        current_user: User
):

    # Check document belongs to current user
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )

    context_chunks = search_similar_chunks(
        db=db,
        qustion=qustion,
        document_id=document_id
    )

    context = "\n\n".join(context_chunks)

    prompt = f"""
You are a helpful AI assistant.

Answer the user's question using ONLY the information provided
in the context below.

If the answer is not found in the context, reply exactly:

"I couldn't find the information in the uploaded document."

Do not use outside knowledge.
Do not make up information.

Context:
{context}

Question:
{qustion}
"""

    responce = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return responce.choices[0].message.content