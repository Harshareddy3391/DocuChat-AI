from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


def save_chunks(
    db: Session,
    document_id: int,
    chunks: list[str],
    embeddings: list[list[float]]
):
    """
    Save all document chunks and embeddings into PostgreSQL.
    """

    if len(chunks) != len(embeddings):
        raise ValueError(
            "Number of chunks and embeddings must be equal."
        )

    document_chunks = []

    for index, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        document_chunk = DocumentChunk(
            document_id=document_id,
            chunk_index=index,
            chunk_text=chunk,
            embedding=embedding
        )

        document_chunks.append(document_chunk)

    db.add_all(document_chunks)
    db.commit()

    return document_chunks