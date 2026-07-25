from openai import OpenAI
from app.core.config import settings
from fastapi import HTTPException,status

#create client openai
client=OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def create_embeddings(chunks:list[str])->list[list[float]]:

    """
    Genarate embeddings for text chunks.
       Args:
        chunks (list[str]): List of text chunks.

    Returns:
        list[list[float]]: List of embedding vectors.
    """


    if not chunks:
        return []

    try:
        response=client.embeddings.create(
            model="text-embedding-3-small",
            input=chunks
                 )


        embeddings=[
            item.embedding
            for item in response.data
                ]


        return embeddings
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Embedding genaration failed:{str(e)}"
            )