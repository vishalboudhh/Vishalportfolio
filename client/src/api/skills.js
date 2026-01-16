import api from "./axios";

export const getSkills = () => api.get("/skills");

export const addCategory = (data) =>
  api.post("/skills/category", data);

export const deleteCategory = (categoryId) =>
  api.delete(`/skills/category/${categoryId}`);

export const reorderCategories = (orders) =>
  api.put("/skills/reorder/categories", { orders });

export const updateSkill = (categoryId, data) =>
  api.put(`/skills/${categoryId}/skills`, data);
