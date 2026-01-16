import api from "./axios";

/* ---------- GET ALL SKILLS ---------- */
export const getSkills = () => api.get("/skills");

/* ---------- ADD CATEGORY ---------- */
export const addCategory = (data) =>
  api.post("/skills/category", data);

/* ---------- DELETE CATEGORY ---------- */
export const deleteCategory = (categoryId) =>
  api.delete(`/skills/category/${categoryId}`);

/* ---------- REORDER CATEGORIES ---------- */
export const reorderCategories = (orders) =>
  api.put("/skills/reorder/categories", { orders });

/* ---------- SAVE ALL SKILLS (BULK) ---------- */
export const saveAllSkills = (categories) =>
  api.put("/skills/bulk", { categories });
