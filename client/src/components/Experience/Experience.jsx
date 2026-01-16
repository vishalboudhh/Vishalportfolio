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

  return (
    <div className="bg-black text-white px-6 md:px-20 py-16">

      {/* Title (Always Visible) */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Experience
      </h2>

      <div className="space-y-10">

        {/* Skeleton Loader */}
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="border-l-2 border-gray-600 pl-6 animate-pulse"
              >
                <div className="h-5 w-48 bg-gray-700 rounded mb-2" />
                <div className="h-4 w-64 bg-gray-600 rounded mb-4" />

                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-700 rounded" />
                  <div className="h-4 w-11/12 bg-gray-700 rounded" />
                  <div className="h-4 w-10/12 bg-gray-700 rounded" />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-6 w-16 bg-gray-700 rounded-full"
                    />
                  ))}
                </div>
              </div>
            ))
          : experiences.map((exp) => (
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
