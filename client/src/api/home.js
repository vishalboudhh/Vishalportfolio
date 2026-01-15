import api from "./axios";

export const getHome = () => api.get("/home");
export const updateHome = (data) => api.put("/home", data);