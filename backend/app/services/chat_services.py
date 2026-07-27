from openai import OpenAI 
from app.core.config import settings 

from app.services.search_service import search_similar_chunks



client=OpenAI(
    api_key=settings.OPENAI_API_KEY
)

def chat_with_document(
        db,
        document_id:int,
        qustion:str
):


    context_chunks=search_similar_chunks(
        db=db,
        qustion=qustion,
        document_id=document_id
    )

    context="\n\n".join(context_chunks)



    prompt=f"""
You are a helpful AI assistance.

Answer the user's question using below.

If the answew not founded in  the context:
reply with:

"I could't fine the information in the wpload document."

context:
{context}
Qustion:
{qustion}



                """



    responce=client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )


    return responce.choices[0].message.content