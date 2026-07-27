from pydantic  import  BaseModel

class ChatRequest(BaseModel):
    document_id:int
    qustion:str


class ChatResponce(BaseModel):
    answer:str