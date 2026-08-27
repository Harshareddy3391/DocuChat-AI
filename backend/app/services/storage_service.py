from supabase import create_client, Client
import uuid
from fastapi import UploadFile

from app.core.config import settings


supabase: Client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)


def upload_pdf(file: UploadFile, user_id: int) -> dict:
    """
    Upload PDF to Supabase Storage.
    Return storage path and original file information.
    """

    # Validate PDF
    if file.content_type != "application/pdf":
        raise ValueError("Only PDF files are allowed.")

    # Get file extension
    file_extension = file.filename.split(".")[-1]

    # Generate unique file name
    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    # Example:
    # 5/550e8400-e29b-41d4-a716-446655440000.pdf
    storage_path = f"{user_id}/{unique_filename}"

    # Read file bytes
    file_bytes = file.file.read()

    # Upload to Supabase Storage
    supabase.storage.from_(settings.SUPABASE_BUCKET).upload(
        path=storage_path,
        file=file_bytes,
        file_options={
            "content-type": file.content_type,
            "upsert": "false"
        },
    )

    return {
        "filename": file.filename,
        "storage_path": storage_path,
        "file_size": len(file_bytes),
        "file_bytes": file_bytes
    }


def genarate_signed_url(
    storage_path: str,
    expires_in: int = 3600
) -> str:
    """
    Generate a signed URL for a private file.
    Default expiry: 1 hour.
    """

    response = (
        supabase
        .storage
        .from_(settings.SUPABASE_BUCKET)
        .create_signed_url(
            storage_path,
            expires_in
        )
    )

    return response["signedURL"]


def delete_pdf(storage_path: str) -> None:
    """
    Delete a PDF from Supabase Storage.
    """

    supabase.storage.from_(settings.SUPABASE_BUCKET).remove(
        [storage_path]
    )