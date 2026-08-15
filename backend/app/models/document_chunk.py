from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship,Session
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector

from app.db.database import Base



class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False
    )

    chunk_index = Column(
        Integer,
        nullable=False
    )

    chunk_text = Column(
        Text,
        nullable=False
    )

    embedding = Column(
        Vector(1536),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    document = relationship(
        "Document",
        back_populates="chunks"
    )



def search_similar_chunks(
        db:Session,
        query_embedding:list[float],
        limit:int=5
):

    """
    Search for the most similir documts chunks using pgvector cosine similarity
    """

    documents=(
        db.query(DocumentChunk).order_by(
            DocumentChunk.embedding.cosine_distance(
                query_embedding
            )
        )
        .limit(limit)
        .all()
    )

    return documents