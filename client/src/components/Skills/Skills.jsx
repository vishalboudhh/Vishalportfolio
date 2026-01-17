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

  return (
    <div className="text-white bg-black min-h-screen px-6 md:px-20 py-16">

      {/* Title (Always Visible) */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        My Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Skeleton Loader */}
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-5 w-40 bg-gray-700 rounded mb-6 animate-pulse" />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white/10 p-3 rounded-lg animate-pulse"
                    >
                      <div className="w-7 h-7 bg-gray-600 rounded" />
                      <div className="h-4 w-20 bg-gray-600 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          : skills.map((group) => (
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
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-7 h-7 object-contain"
                        loading="lazy"
                      />
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
