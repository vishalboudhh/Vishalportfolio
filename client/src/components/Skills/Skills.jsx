import { useEffect, useState } from "react";
import { getSkills } from "../../api/skills";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data.data))
      .catch((err) => console.error("Skills fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 tracking-wide">Loading Skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        My Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {skills.map((group) => (
          <div key={group._id}>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
              {group.category}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-lg shadow-sm"
                >
                  {/* ICON */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-7 h-7 object-contain"
                  />

                  {/* NAME */}
                  <span className="text-sm md:text-base">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
