import express from "express";
import {
  getAboutData,
  updateAboutData
} from "../controllers/about.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getAboutData);

/* Admin */
router.put("/", authMiddleware, updateAboutData);

export default router;
