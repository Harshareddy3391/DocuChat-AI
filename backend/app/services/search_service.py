from sqlalchemy.orm import Session
from sqlalchemy import text

from app.services.embedding_service import create_embeddings


def search_similar_chunks(
    db: Session,
    qustion: str,
    document_id: int,
    limit: int = 5
):
    """
    Search the most similar chunks for a question.
    """

    # Generate embedding for the question

    qustion_embedding = create_embeddings([qustion])[0]

    sql = text(
        """
        SELECT
            chunk_text
        FROM document_chunks
        WHERE document_id = :document_id
        ORDER BY embedding <=> CAST(:embedding AS vector)
        LIMIT :limit
        """
    )

    result = db.execute(
        sql,
        {
            "document_id": document_id,
            "embedding": str(qustion_embedding),
            "limit": limit
        }
    )

    return [
        row.chunk_text for row in result
    ]