import api from "./axios";

/* ---------- GET ALL EXPERIENCES ---------- */
export const getExperiences = () => api.get("/experience");

/* ---------- CREATE EXPERIENCE ---------- */
export const createExperience = (data) =>
  api.post("/experience", data);

/* ---------- UPDATE EXPERIENCE ---------- */
export const updateExperience = (id, data) =>
  api.put(`/experience/${id}`, data);

/* ---------- DELETE EXPERIENCE ---------- */
export const deleteExperience = (id) =>
  api.delete(`/experience/${id}`);

/* ---------- REORDER EXPERIENCE ---------- */
/* ❗ FIXED URL to match backend */
export const reorderExperience = (orders) =>
  api.put("/experience/reorder/all", { orders });
