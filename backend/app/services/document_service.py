from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.services.chunk_service import create_chunks

from app.models.document_model import Document
from app.models.user_model import User 
from app.services.pdf_services import extract_text

from app.services.storage_service import (
    upload_pdf,
    delete_pdf
)

def create_document(
    db: Session,
    file: UploadFile,
    current_user: User
):
    """
    Upload PDF to Supabase Storage and save document metadata in PostgreSQL.
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

    return document