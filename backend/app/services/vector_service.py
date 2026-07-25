from sqlalchemy.orm import Session
from app.models.document_chunk import DocumentChunk



def save_chunk(
        db:Session,
        document_id:int,
        chunks:list[str],
        embeddings:list[list[float]]
        ):

    """
    Save text chunks and their embeddings into the database.

    Args:
        db (Session): Database session.
        document_id (int): Uploaded document ID.
        chunks (list[str]): List of text chunks.
        embeddings (list[list[float]]): List of embedding vectors.
    """


    if len(chunks) != len(embedding):
         raise ValueError(
          "Number of chunks and embeddings must be equal."
     )



    document_chunk=[]

    for index,(chunk,embedding) in enumerate(zip(chunks,embeddings)):

         document_chunk=DocumentChunk(
              document_id=document_id,
              chunk_index=index,
              chunk_text=chunk,
              embedding=embedding
         )

         document_chunk.append(document_chunk)


         db.add_all(document_chunk)
         db.commit()

         return document_chunk


