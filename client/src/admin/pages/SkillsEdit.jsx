import { useEffect, useState } from "react";
import {
  getSkills,
  addCategory,
  deleteCategory,
  reorderCategories,
  saveAllSkills,
} from "../../api/skills";

import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";
import toast from "react-hot-toast";

const SkillsEdit = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH SKILLS ---------------- */
  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  /* ---------------- ADD CATEGORY ---------------- */
  const addNewCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await addCategory({ category: newCategory.trim() });
      setNewCategory("");
      toast.success("Category added");
      fetchSkills();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  /* ---------------- DELETE CATEGORY ---------------- */
  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      fetchSkills();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  /* ---------------- REORDER CATEGORY ---------------- */
  const moveCategory = async (index, direction) => {
    const updated = [...categories];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;

    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    setCategories(updated);

    const orders = updated.map((cat, i) => ({
      id: cat._id,
      order: i + 1,
    }));

    try {
      await reorderCategories(orders);
      toast.success("Category reordered");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reorder categories");
    }
  };

  /* ---------------- ADD SKILL (UI ONLY) ---------------- */
  const addSkillUI = (catIndex) => {
    setCategories((prev) => {
      const updated = [...prev];

      if (!updated[catIndex].skills) {
        updated[catIndex].skills = [];
      }

      updated[catIndex].skills.push({
        name: "",
        icon: "",
        order: updated[catIndex].skills.length + 1,
      });

      return updated;
    });

    toast.success("Skill added (not saved yet)");
  };

  /* ---------------- REMOVE SKILL ---------------- */
  const removeSkill = (catIndex, skillIndex) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[catIndex].skills.splice(skillIndex, 1);
      return updated;
    });

    toast.success("Skill removed (not saved yet)");
  };

  /* ---------------- UPDATE SKILL FIELD ---------------- */
  const updateSkillField = (catIndex, skillIndex, key, value) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[catIndex].skills[skillIndex][key] = value;
      return updated;
    });
  };

  /* ---------------- SAVE ALL SKILLS ---------------- */
  const saveSkills = async () => {
    try {
      const payload = categories.map((cat, i) => ({
        category: cat.category,
        order: i + 1,
        skills: (cat.skills || []).map((s, j) => ({
          name: s.name,
          icon: s.icon,
          order: j + 1,
        })),
      }));

      await saveAllSkills(payload);
      toast.success("Skills updated successfully");
      fetchSkills();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skills");
    }
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return <p className="text-white">Loading skills...</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="text-white space-y-10 max-w-6xl px-2 sm:px-0">
      <h2 className="text-3xl font-bold">Edit Skills</h2>

      {/* ADD CATEGORY */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="bg-black border border-gray-700 px-4 py-3 rounded-lg w-full"
        />
        <button
          onClick={addNewCategory}
          className="bg-emerald-600 px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {categories.map((cat, catIndex) => (
        <div
          key={cat._id}
          className="border border-white/10 rounded-xl p-5 space-y-5 bg-white/5"
        >
          {/* CATEGORY HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-xl font-semibold">{cat.category}</h3>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => moveCategory(catIndex, "up")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowUp size={18} />
              </button>
              <button
                onClick={() => moveCategory(catIndex, "down")}
                className="p-2 bg-gray-800 rounded"
              >
                <ArrowDown size={18} />
              </button>
              <button
                onClick={() => removeCategory(cat._id)}
                className="p-2 bg-red-600/20 text-red-400 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* SKILLS */}
          {(cat.skills || []).map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className="flex flex-col sm:flex-row gap-3 bg-black/60 p-3 rounded-lg"
            >
              <input
                value={skill.name}
                onChange={(e) =>
                  updateSkillField(
                    catIndex,
                    skillIndex,
                    "name",
                    e.target.value
                  )
                }
                placeholder="Skill name"
                className="w-full sm:flex-1 bg-transparent border border-gray-700 px-3 py-2 rounded"
              />
              <input
                value={skill.icon}
                onChange={(e) =>
                  updateSkillField(
                    catIndex,
                    skillIndex,
                    "icon",
                    e.target.value
                  )
                }
                placeholder="Icon URL"
                className="w-full sm:flex-1 bg-transparent border border-gray-700 px-3 py-2 rounded"
              />
              <button
                onClick={() => removeSkill(catIndex, skillIndex)}
                className="p-2 bg-red-600/20 text-red-400 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              onClick={() => addSkillUI(catIndex)}
              className="bg-blue-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Skill
            </button>
            <button
              onClick={saveSkills}
              className="bg-emerald-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsEdit;
