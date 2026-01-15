import express from "express";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects
} from "../controllers/projects.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getProjects);

/* Admin */
router.post("/", authMiddleware, addProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);
router.put("/reorder/all", authMiddleware, reorderProjects);

export default router;
