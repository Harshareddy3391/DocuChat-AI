import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

/* ===========================
   Upload Document
=========================== */

export const uploadDocument = async (
    formData,
    onUploadProgress
) => {

    return API.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        }
    );

};

/* ===========================
   Get All Documents
=========================== */

export const getDocuments = async () => {

    return API.get("/documents");

};

/* ===========================
   Delete Document
=========================== */

export const deleteDocument = async (id) => {

    return API.delete(`/documents/${id}`);

};

/* ===========================
   Open / View Document
=========================== */

export const getDocument = async (id) => {

    return API.get(`/documents/${id}`);

};

export default API;