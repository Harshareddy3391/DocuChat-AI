import API from "./documentService";

export const getProfile = async () => {

    return API.get("/auth/me");

};