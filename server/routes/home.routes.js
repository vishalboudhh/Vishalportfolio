import express from "express";
import {
  getHomeData,
  updateHomeData
} from "../controllers/home.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getHomeData);

/* Admin */
router.put("/", authMiddleware, updateHomeData);

export default router;
