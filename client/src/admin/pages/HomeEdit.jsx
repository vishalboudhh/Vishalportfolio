import { useEffect, useState } from "react";
import { getHome, updateHome } from "../../api/home";
import { FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const HomeEdit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHome()
      .then((res) => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const save = async () => {
    await updateHome(data);
    alert("Home updated successfully");
  };

  const fields = [
    {
      name: "linkedin",
      label: "LinkedIn Profile",
      icon: <FaLinkedin className="text-blue-500" />,
    },
    {
      name: "github",
      label: "GitHub Profile",
      icon: <FaGithub className="text-gray-300" />,
    },
    {
      name: "leetcode",
      label: "LeetCode Profile",
      icon: <SiLeetcode className="text-orange-400" />,
    },
    {
      name: "gfg",
      label: "GeeksforGeeks Profile",
      icon: <SiGeeksforgeeks className="text-green-400" />,
    },
    {
      name: "resumeUrl",
      label: "Resume / CV Link",
      icon: <FaFilePdf className="text-red-400" />,
    },
  ];

  return (
    <div className="max-w-3xl text-white space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold">Edit Home Section</h2>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">

        {/* Skeleton Loader */}
        {loading
          ? fields.map((field) => (
              <div key={field.name} className="space-y-2 animate-pulse">
                <div className="h-4 w-40 bg-gray-600 rounded" />
                <div className="h-11 bg-black/60 border border-gray-700 rounded-lg" />
              </div>
            ))
          : fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-sm text-gray-300">
                  {field.label}
                </label>

                <div className="flex items-center gap-3 bg-black/60 border border-gray-700 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                  {field.icon}
                  <input
                    type="url"
                    name={field.name}
                    value={data[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="flex-1 bg-transparent outline-none text-white"
                  />
                </div>
              </div>
            ))}
      </div>

      {/* Save Button */}
      <button
        onClick={save}
        disabled={loading}
        className={`px-8 py-3 rounded-xl font-semibold transition
          ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }
        `}
      >
        {loading ? "Loading..." : "Save Changes"}
      </button>
    </div>
  );
};

export default HomeEdit;
