import API from "./documentService";

export const askQuestion = async (documentId, question) => {

    return API.post("/chat/", {
        document_id: documentId,
        question: question,
    });

};