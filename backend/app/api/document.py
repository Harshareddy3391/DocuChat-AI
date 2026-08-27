"""
Document API Router

This file handles all document-related HTTP endpoints.

Responsibilities:
1. Upload PDF
2. Delete PDF

The Router does NOT contain business logic.

It simply calls the corresponding service function.
"""

from fastapi import APIRouter, Depends, UploadFile, File, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import get_current_user

from app.models.user_model import User
from app.schemas.document_schema import DocumentResponse
from app.services.document_service import create_document,delete_document,get_documents
 
from app.services.storage_service import genarate_signed_url

# Create router
router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a PDF document.
    """

    doc = create_document(
        db=db,
        file=file,
        current_user=current_user
    )

    return DocumentResponse(
        id=doc.id,
        filename=doc.filename,
        file_size=doc.file_size,
        uploaded_at=doc.uploaded_at,
        file_path=genarate_signed_url(doc.file_path)
    )




@router.get(
    "",
    response_model=list[DocumentResponse]
)
def get_all_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all documents uploaded by the current user.
    """

    docs = get_documents(
        db=db,
        current_user=current_user
    )

    return [
        DocumentResponse(
            id=doc.id,
            filename=doc.filename,
            file_size=doc.file_size,
            uploaded_at=doc.uploaded_at,
            file_path=genarate_signed_url(doc.file_path)
        )
        for doc in docs
    ]


@router.delete("/{document_id}")
def remove_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a document.

    This deletes:
    1. PDF from Supabase Storage
    2. Metadata from PostgreSQL
    """

    return delete_document(
        db=db,
        document_id=document_id,
        current_user=current_user
    )