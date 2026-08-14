from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.document_model import Document
from app.models.document_chunk import DocumentChunk
from app.models.user_model import User

from app.services.storage_service import (
    upload_pdf,
    delete_pdf
)

from app.services.pdf_services import extract_text
from app.services.chunk_service import create_chunks
from app.services.embedding_service import create_embeddings
from app.services.vector_service import save_chunks


def create_document(
    db: Session,
    file: UploadFile,
    current_user: User
):
    """
    Upload PDF to Supabase Storage, extract text, generate embeddings,
    store document metadata and save vectors in PostgreSQL.
    """

    # Upload PDF
    uploaded_file = upload_pdf(
        file=file,
        user_id=current_user.id
    )

    # Extract text from PDF
    text = extract_text(uploaded_file["file_bytes"])

    # Split text into chunks
    chunks = create_chunks(text)

    # Generate embeddings
    embeddings = create_embeddings(chunks)

    print("=" * 50)
    print(f"TOTAL CHUNKS : {len(chunks)}")
    print("=" * 50)

    for index, chunk in enumerate(chunks, start=1):
        print(f"\nChunk {index}")
        print("-" * 50)
        print(chunk)

    # Save document metadata
    document = Document(
        filename=uploaded_file["filename"],
        file_path=uploaded_file["storage_path"],
        file_size=uploaded_file["file_size"],
        user_id=current_user.id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    # Save chunks and embeddings
    save_chunks(
        db=db,
        document_id=document.id,
        chunks=chunks,
        embeddings=embeddings
    )

    return document

def delete_document(
    db: Session,
    document_id: int,
    current_user: User
):
    """
    Delete document, its chunks, and PDF from Supabase Storage.
    """

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

    # Delete PDF from Supabase Storage
    delete_pdf(document.file_path)

    # Delete document chunks
    db.query(DocumentChunk).filter(
        DocumentChunk.document_id == document.id
    ).delete()

    # Delete document metadata
    db.delete(document)

    db.commit()

    return {
        "message": "Document deleted successfully"
    }




def get_documents(
    db: Session,
    current_user: User
):
    """
    Get all documents uploaded by the current user.
    """

    documents = (
        db.query(Document)
        .filter(
            Document.user_id == current_user.id
        )
        .order_by(Document.uploaded_at.desc())
        .all()
    )

    return documents