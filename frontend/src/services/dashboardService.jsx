import API from "./documentService";

export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};
export const getRecentDocuments = async () => {
  const response = await API.get("/dashboard/recent-documents");
  return response.data;
};

export default API;