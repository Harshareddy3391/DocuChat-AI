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

export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};

export const getRecentDocuments = async () => {
  const response = await API.get("/documents");
  return response.data;
};

export default API;