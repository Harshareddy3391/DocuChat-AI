from sqlalchemy.orm import Session 
from sqlalchemy import table


from app.services.embedding_service import create_embeddings


def search_similar_chunks(
        db:Session,qustion:str,
        document_id:int,
        limit:int=5
    ):

    """
    search the most similar chunks for a qustion.
    """

    #genarte embedding for the qustion

    qustion_embedding=create_embeddings([qustion][0])

    sql=text(
        """
        SELECT
          chunk_text
        FROM
        document_id=:document_id
        ORDER BY 
        embedding<=>:embedding
        LIMIT:limit

        """
    )

    result=db.execute(
        sql,{
            "document_id":document_id,
            "embedding":qustion_embedding
        }
    )

    return [
        row.chunk_text for row in result
    ]