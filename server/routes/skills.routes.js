import express from "express";
import {
  getSkills,
  addCategory,
  deleteCategory,
  addSkillItem,
  deleteSkillItem,
  bulkUpsertSkills,
  reorderCategories,
  reorderSkillItems,
  updateCategorySkills
} from "../controllers/skills.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";



const router = express.Router();

/* Public */
router.get("/", getSkills);

/* Admin */
router.post("/category", authMiddleware, addCategory);
router.delete("/category/:id", authMiddleware, deleteCategory);

router.post("/item", authMiddleware, addSkillItem);
router.delete("/item", authMiddleware, deleteSkillItem);


router.put("/bulk", authMiddleware, bulkUpsertSkills);
router.put("/reorder/categories", authMiddleware, reorderCategories);
router.put("/reorder/items", authMiddleware, reorderSkillItems);



router.put("/:categoryId/skills", authMiddleware, updateCategorySkills);

export default router;
