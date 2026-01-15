import Skill from "../models/Skill.js";

/* ---------- GET ALL SKILL CATEGORIES (Public) ---------- */
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error("Get Skills Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills"
    });
  }
};

/* ---------- ADD CATEGORY (Admin) ---------- */
export const addCategory = async (req, res) => {
  try {
    const { category, order } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const exists = await Skill.findOne({ category });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists"
      });
    }

    const newCategory = await Skill.create({
      category,
      order: order || 0,
      skills: []
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory
    });
  } catch (error) {
    console.error("Add Category Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create category"
    });
  }
};

/* ---------- DELETE CATEGORY (Admin) ---------- */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
    }

    const category = await Skill.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Delete Category Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category"
    });
  }
};

/* ---------- ADD SKILL TO CATEGORY (Admin) ---------- */
export const addSkillItem = async (req, res) => {
  try {
    const { categoryId, name, icon, order } = req.body;

    if (!categoryId || !name || !icon) {
      return res.status(400).json({
        success: false,
        message: "Category ID, skill name and icon are required"
      });
    }

    const category = await Skill.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const skillExists = category.skills.some(
      (skill) => skill.name.toLowerCase() === name.toLowerCase()
    );

    if (skillExists) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists in this category"
      });
    }

    category.skills.push({
      name,
      icon,
      order: order || 0
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: category
    });
  } catch (error) {
    console.error("Add Skill Item Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add skill"
    });
  }
};

/* ---------- DELETE SKILL FROM CATEGORY (Admin) ---------- */
export const deleteSkillItem = async (req, res) => {
  try {
    const { categoryId, skillName } = req.body;

    if (!categoryId || !skillName) {
      return res.status(400).json({
        success: false,
        message: "Category ID and skill name are required"
      });
    }

    const category = await Skill.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const originalLength = category.skills.length;

    category.skills = category.skills.filter(
      (skill) => skill.name !== skillName
    );

    if (category.skills.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: "Skill not found in category"
      });
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Skill removed successfully",
      data: category
    });
  } catch (error) {
    console.error("Delete Skill Item Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove skill"
    });
  }
};


/* ---------- BULK INSERT SKILLS (Admin) ---------- */
export const bulkUpsertSkills = async (req, res) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Categories array is required"
      });
    }

    // Basic validation
    for (const cat of categories) {
      if (!cat.category || !Array.isArray(cat.skills)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category structure"
        });
      }
    }

    // Clear old data
    await Skill.deleteMany({});

    // Insert new data
    const inserted = await Skill.insertMany(categories);

    return res.status(201).json({
      success: true,
      message: "Skills bulk inserted successfully",
      data: inserted
    });
  } catch (error) {
    console.error("Bulk Insert Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Bulk insert failed"
    });
  }
};

/* ---------- REORDER SKILL CATEGORIES (Admin) ---------- */
export const reorderCategories = async (req, res) => {
  try {
    const { orders } = req.body;

    if (!Array.isArray(orders)) {
      return res.status(400).json({
        success: false,
        message: "Orders array is required"
      });
    }

    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    await Skill.bulkWrite(bulkOps);

    return res.status(200).json({
      success: true,
      message: "Categories reordered successfully"
    });
  } catch (error) {
    console.error("Reorder Categories Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to reorder categories"
    });
  }
};


/* ---------- REORDER SKILLS IN CATEGORY (Admin) ---------- */
export const reorderSkillItems = async (req, res) => {
  try {
    const { categoryId, orders } = req.body;

    if (!categoryId || !Array.isArray(orders)) {
      return res.status(400).json({
        success: false,
        message: "Category ID and orders array are required"
      });
    }

    const category = await Skill.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    category.skills.forEach((skill) => {
      const found = orders.find((o) => o.name === skill.name);
      if (found) {
        skill.order = found.order;
      }
    });

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Skills reordered successfully"
    });
  } catch (error) {
    console.error("Reorder Skill Items Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to reorder skills"
    });
  }
};
