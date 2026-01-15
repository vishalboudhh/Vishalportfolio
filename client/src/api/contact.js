import api from "./axios";

export const getContact = () => api.get("/contact");

export const updateContact = (data) => api.put("/contact", data);
