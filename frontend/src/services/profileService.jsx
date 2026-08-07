import API from "./documentService";

export const getProfile = async () => {

    return API.get("/users/me");

};

export const getProfileStats = async () => {

    return API.get("/users/stats");

};