import Project from "../models/Project.js";

/* ---------- GET PROJECTS (Public) ---------- */
export const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;

    const filter = { status: "active" };
    if (featured === "true") {
      filter.featured = true;
    }

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error("Get Projects Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    });
  }
};

/* ---------- ADD PROJECT (Admin) ---------- */
export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      image,
      liveLink,
      githubLink,
      featured,
      order
    } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, description and image are required"
      });
    }

    const project = await Project.create({
      title,
      description,
      techStack,
      image,
      liveLink,
      githubLink,
      featured,
      order
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project
    });
  } catch (error) {
    console.error("Add Project Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add project"
    });
  }
};

/* ---------- UPDATE PROJECT (Admin) ---------- */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    Object.assign(project, req.body);
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    console.error("Update Project Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update project"
    });
  }
};

/* ---------- DELETE PROJECT (Admin) ---------- */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Delete Project Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
};

/* ---------- REORDER PROJECTS (Admin) ---------- */
export const reorderProjects = async (req, res) => {
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

    await Project.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "Projects reordered successfully"
    });
  } catch (error) {
    console.error("Reorder Projects Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to reorder projects"
    });
  }
};
