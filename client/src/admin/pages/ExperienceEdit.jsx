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

/* ❌ DO NOT USE FOR CREATE (backend rejects empty fields) */
const emptyExperience = {
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: [],
};

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  /* ---------- ADD EXPERIENCE (FIXED, UI SAME) ---------- */
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

      fetchExperiences();
    } catch (err) {
      console.error(err);
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

      alert("Experience updated");
      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!confirm("Delete this experience?")) return;

    try {
      await deleteExperience(id);
      fetchExperiences();
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-white">Loading experience...</p>;
  }

  return (
    <div className="text-white space-y-8 max-w-5xl">
      {/* HEADER */}
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
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="font-semibold text-lg">
              {exp.role || "New Role"} @ {exp.company || "Company"}
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => moveItem(index, "up")}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <ArrowUp size={18} />
              </button>

              <button
                onClick={() => moveItem(index, "down")}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <ArrowDown size={18} />
              </button>

              <button
                onClick={() => handleDelete(exp._id)}
                className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* FIELDS */}
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
              onChange={(e) =>
                updateField(index, "location", e.target.value)
              }
              placeholder="Location"
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              type="date"
              value={exp.startDate?.slice(0, 10)}
              onChange={(e) =>
                updateField(index, "startDate", e.target.value)
              }
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              type="date"
              value={exp.endDate?.slice(0, 10) || ""}
              onChange={(e) =>
                updateField(index, "endDate", e.target.value)
              }
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />
          </div>

          <textarea
            value={(exp.description || []).join("\n")}
            onChange={(e) =>
              updateField(index, "description", e.target.value.split("\n"))
            }
            placeholder="Description (one point per line)"
            rows={4}
            className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          />

          <button
            onClick={() => handleSave(exp)}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExperienceEdit;
