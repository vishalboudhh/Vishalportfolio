import api from "./axios";

/* ---------- GET PROJECTS ---------- */
export const getProjects = () => api.get("/projects");

/* ---------- CREATE PROJECT ---------- */
export const createProject = (data) =>
  api.post("/projects", data);

/* ---------- UPDATE PROJECT ---------- */
export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data);

/* ---------- DELETE PROJECT ---------- */
export const deleteProject = (id) =>
  api.delete(`/projects/${id}`);

/* ---------- REORDER PROJECTS (FIXED URL) ---------- */
export const reorderProjects = (orders) =>
  api.put("/projects/reorder/all", { orders });
