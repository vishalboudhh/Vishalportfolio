import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "../../api/projects";

import {
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Plus,
} from "lucide-react";

const ProjectsEdit = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ---------- */
  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------- ADD PROJECT ---------- */
  const handleAdd = async () => {
    try {
      await createProject({
        title: "New Project",
        description: "Project description",
        image: "https://via.placeholder.com/600x400",
        techStack: [],
        liveLink: "",
        githubLink: "",
        featured: false,
        order: projects.length + 1,
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- UPDATE FIELD ---------- */
  const updateField = (index, key, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [key]: value };
    setProjects(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async (project) => {
    try {
      await updateProject(project._id, project);
      alert("Project updated successfully");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- REORDER ---------- */
  const moveProject = async (index, direction) => {
    const updated = [...projects];
    const target = direction === "up" ? index - 1 : index + 1;

    if (target < 0 || target >= updated.length) return;

    [updated[index], updated[target]] = [
      updated[target],
      updated[index],
    ];

    setProjects(updated);

    const orders = updated.map((p, i) => ({
      id: p._id,
      order: i + 1,
    }));

    try {
      await reorderProjects(orders);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- SKELETON LOADER ---------- */
  if (loading) {
    return (
      <div className="text-white space-y-8 max-w-6xl animate-pulse">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-56 bg-white/10 rounded" />
          <div className="h-12 w-44 bg-white/10 rounded-lg" />
        </div>

        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5"
          >
            {/* CARD HEADER */}
            <div className="flex justify-between">
              <div className="h-6 w-64 bg-white/10 rounded" />
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg" />
                <div className="h-10 w-10 bg-white/10 rounded-lg" />
                <div className="h-10 w-10 bg-white/10 rounded-lg" />
              </div>
            </div>

            {/* INPUT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((__, j) => (
                <div
                  key={j}
                  className="h-10 bg-white/10 rounded"
                />
              ))}
            </div>

            {/* TEXTAREA */}
            <div className="h-24 bg-white/10 rounded" />

            {/* SAVE BUTTON */}
            <div className="h-12 w-40 bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className="text-white space-y-8 max-w-6xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold">Edit Projects</h2>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {projects.map((p, index) => (
        <div
          key={p._id}
          className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {p.title || "New Project"}
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => moveProject(index, "up")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowUp size={18} />
              </button>

              <button
                onClick={() => moveProject(index, "down")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowDown size={18} />
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="p-2 bg-red-600/20 text-red-400 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={p.title}
              onChange={(e) => updateField(index, "title", e.target.value)}
              placeholder="Project title"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              value={p.image || ""}
              onChange={(e) => updateField(index, "image", e.target.value)}
              placeholder="Image URL"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              value={p.liveLink || ""}
              onChange={(e) => updateField(index, "liveLink", e.target.value)}
              placeholder="Live demo link"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              value={p.githubLink || ""}
              onChange={(e) => updateField(index, "githubLink", e.target.value)}
              placeholder="GitHub link"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
          </div>

          <textarea
            value={p.description}
            onChange={(e) => updateField(index, "description", e.target.value)}
            rows={4}
            placeholder="Project description"
            className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          />

          <button
            onClick={() => handleSave(p)}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsEdit;
