import express from "express";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
  reorderExperience
} from "../controllers/experience.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getExperiences);

/* Admin */
router.post("/", authMiddleware, addExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);
router.put("/reorder/all", authMiddleware, reorderExperience);

export default router;
