import { useEffect, useState } from "react";
import { getSkills } from "../../api/skills";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data.data))
      .catch((err) => console.error("Skills fetch error:", err));
  }, []);

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
