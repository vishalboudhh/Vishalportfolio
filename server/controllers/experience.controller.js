import Experience from "../models/Experience.js";

/* ---------- GET ALL EXPERIENCES (Public) ---------- */
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({ order: 1, startDate: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error("Get Experience Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences"
    });
  }
};

/* ---------- ADD EXPERIENCE (Admin) ---------- */
export const addExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      techStack,
      order
    } = req.body;

    if (!company || !role || !startDate || !description?.length) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const experience = await Experience.create({
      company,
      role,
      location,
      startDate,
      endDate: isCurrent ? null : endDate,
      isCurrent,
      description,
      techStack,
      order
    });

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: experience
    });
  } catch (error) {
    console.error("Add Experience Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add experience"
    });
  }
};

/* ---------- UPDATE EXPERIENCE (Admin) ---------- */
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
      });
    }

    Object.assign(experience, req.body);

    if (experience.isCurrent) {
      experience.endDate = null;
    }

    await experience.save();

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience
    });
  } catch (error) {
    console.error("Update Experience Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update experience"
    });
  }
};

/* ---------- DELETE EXPERIENCE (Admin) ---------- */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully"
    });
  } catch (error) {
    console.error("Delete Experience Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete experience"
    });
  }
};

/* ---------- REORDER EXPERIENCE (Admin) ---------- */
export const reorderExperience = async (req, res) => {
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

    await Experience.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "Experience reordered successfully"
    });
  } catch (error) {
    console.error("Reorder Experience Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to reorder experience"
    });
  }
};
