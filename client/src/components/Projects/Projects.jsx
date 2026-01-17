import { useEffect, useState } from "react";
import { getProjects } from "../../api/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16">

      {/* Title (Always Visible) */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        My Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Skeleton Loader */}
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-5 animate-pulse"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl bg-gray-700" />

                {/* Text */}
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-48 bg-gray-700 rounded" />
                  <div className="h-4 w-full bg-gray-700 rounded" />
                  <div className="h-4 w-11/12 bg-gray-700 rounded" />

                  <div className="h-8 w-28 bg-gray-600 rounded-full mt-3" />
                </div>
              </div>
            ))
          : projects.map((project) => (
              <div
                key={project._id}
                className="bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition duration-300 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start gap-5"
              >
                {/* Icon/Image */}
                <div className="flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-16 rounded-xl object-contain bg-white/10 p-2"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    {project.description}
                  </p>

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
                    >
                      {project.liveLink.includes("github")
                        ? "View Code"
                        : "Live Demo"}
                    </a>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Projects;
