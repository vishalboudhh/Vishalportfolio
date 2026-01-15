import { useEffect, useState } from "react";
import { getExperiences } from "../../api/experience";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then((res) => setExperiences(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 tracking-wide">
            Loading Experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Experience
      </h2>

      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={exp._id} className="border-l-2 border-gray-600 pl-6">
            <h3 className="text-xl font-semibold">{exp.role}</h3>

            <p className="text-gray-400">
              {exp.company} •{" "}
              {new Date(exp.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}{" "}
              –{" "}
              {exp.isCurrent
                ? "Present"
                : new Date(exp.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
            </p>

            <ul className="list-disc ml-5 mt-3 space-y-2">
              {exp.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-white/10 px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
