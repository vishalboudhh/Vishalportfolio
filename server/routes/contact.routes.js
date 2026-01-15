import express from "express";
import {
  getContact,
  upsertContact
} from "../controllers/contact.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getContact);

/* Admin */
router.put("/", authMiddleware, upsertContact);

export default router;
