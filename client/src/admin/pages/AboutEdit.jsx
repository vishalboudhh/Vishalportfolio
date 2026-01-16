import { useEffect, useState } from "react";
import { getAbout, updateAbout } from "../../api/about";
import { Plus, Trash2 } from "lucide-react";

const AboutEdit = () => {
  const [content, setContent] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then((res) => {
        const data = res.data.data;
        setContent(data.content || "");
        setHighlights(data.highlights || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addHighlight = () => {
    setHighlights([...highlights, { word: "", color: "#22c55e" }]);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const updateHighlight = (index, key, value) => {
    const updated = [...highlights];
    updated[index][key] = value;
    setHighlights(updated);
  };

  const handleSave = async () => {
    await updateAbout({ content, highlights });
    alert("About updated successfully");
  };

  return (
    <div className="max-w-5xl mx-auto text-white space-y-8">

      {/* Title (Always Visible) */}
      <h2 className="text-3xl font-bold">Edit About Section</h2>

      {/* ABOUT CONTENT */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">About Content</label>

        {loading ? (
          <div className="h-48 bg-black/60 border border-gray-700 rounded-lg animate-pulse" />
        ) : (
          <textarea
            rows={8}
            className="w-full bg-black/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Write about yourself..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>

      {/* HIGHLIGHTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Colored Keywords</h3>

          <button
            onClick={addHighlight}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }
            `}
          >
            <Plus size={18} /> Add Keyword
          </button>
        </div>

        {/* Skeleton Keywords */}
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
              >
                <div className="flex-1 h-10 bg-gray-700 rounded" />
                <div className="w-12 h-10 bg-gray-700 rounded" />
                <div className="w-6 h-6 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {highlights.length === 0 && (
              <p className="text-gray-400 text-sm">
                No keywords added yet.
              </p>
            )}

            <div className="space-y-3">
              {highlights.map((h, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Keyword (e.g. MERN Stack)"
                    className="flex-1 bg-black border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={h.word}
                    onChange={(e) =>
                      updateHighlight(index, "word", e.target.value)
                    }
                  />

                  <input
                    type="color"
                    value={h.color}
                    onChange={(e) =>
                      updateHighlight(index, "color", e.target.value)
                    }
                    className="w-12 h-10 rounded"
                  />

                  <button
                    onClick={() => removeHighlight(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* SAVE */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 rounded-xl font-semibold
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading ? "Loading..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AboutEdit;
