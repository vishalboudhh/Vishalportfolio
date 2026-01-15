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

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 tracking-wide">
            Loading Projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        My Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project) => (
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
