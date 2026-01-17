import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderExperience,
} from "../../api/experience";

import {
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

const ExperienceEdit = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ---------- */
  const fetchExperiences = async () => {
    try {
      const res = await getExperiences();
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  /* ---------- ADD EXPERIENCE ---------- */
  const handleAdd = async () => {
    try {
      await createExperience({
        company: "New Company",
        role: "New Role",
        location: "",
        startDate: new Date().toISOString(),
        endDate: null,
        isCurrent: true,
        description: ["Add description"],
        techStack: [],
        order: items.length + 1,
      });

      toast.success("Experience added");
      fetchExperiences();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add experience");
    }
  };

  /* ---------- UPDATE FIELD ---------- */
  const updateField = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async (exp) => {
    try {
      await updateExperience(exp._id, {
        ...exp,
        description: exp.description?.filter(Boolean),
      });

      toast.success("Experience updated");
      fetchExperiences();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update experience");
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      await deleteExperience(id);
      toast.success("Experience deleted");
      fetchExperiences();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete experience");
    }
  };

  /* ---------- REORDER ---------- */
  const moveItem = async (index, direction) => {
    const updated = [...items];
    const target = direction === "up" ? index - 1 : index + 1;

    if (target < 0 || target >= updated.length) return;

    [updated[index], updated[target]] = [
      updated[target],
      updated[index],
    ];

    setItems(updated);

    const orders = updated.map((item, i) => ({
      id: item._id,
      order: i + 1,
    }));

    try {
      await reorderExperience(orders);
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reorder");
    }
  };

  /* ---------- SKELETON ---------- */
  if (loading) {
    return (
      <div className="text-white space-y-8 max-w-5xl animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-56 bg-white/10 rounded" />
          <div className="h-12 w-44 bg-white/10 rounded-lg" />
        </div>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="text-white space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold">Edit Experience</h2>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {items.map((exp, index) => (
        <div
          key={exp._id}
          className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              {exp.role || "New Role"} @ {exp.company || "Company"}
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => moveItem(index, "up")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowUp size={18} />
              </button>
              <button
                onClick={() => moveItem(index, "down")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowDown size={18} />
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="p-2 bg-red-600/20 text-red-400 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={exp.role}
              onChange={(e) => updateField(index, "role", e.target.value)}
              placeholder="Role"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
            <input
              value={exp.company}
              onChange={(e) => updateField(index, "company", e.target.value)}
              placeholder="Company"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
            <input
              value={exp.location || ""}
              onChange={(e) => updateField(index, "location", e.target.value)}
              placeholder="Location"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
            <input
              type="date"
              value={exp.startDate?.slice(0, 10)}
              onChange={(e) => updateField(index, "startDate", e.target.value)}
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
            <input
              type="date"
              value={exp.endDate?.slice(0, 10) || ""}
              onChange={(e) => updateField(index, "endDate", e.target.value)}
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
          </div>

          <textarea
            value={(exp.description || []).join("\n")}
            onChange={(e) =>
              updateField(index, "description", e.target.value.split("\n"))
            }
            rows={4}
            className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          />

          <button
            onClick={() => handleSave(exp)}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExperienceEdit;
