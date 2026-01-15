import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTools,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const DashboardHome = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Home",
      path: "/dashboard/home",
      icon: <FaHome size={26} />,
    },
    {
      title: "About",
      path: "/dashboard/about",
      icon: <FaUser size={26} />,
    },
    {
      title: "Skills",
      path: "/dashboard/skills",
      icon: <FaTools size={26} />,
    },
    {
      title: "Experience",
      path: "/dashboard/experience",
      icon: <FaBriefcase size={26} />,
    },
    {
      title: "Projects",
      path: "/dashboard/projects",
      icon: <FaProjectDiagram size={26} />,
    },
    {
      title: "Contact",
      path: "/dashboard/contact",
      icon: <FaEnvelope size={26} />,
    },
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-gray-400 mb-8">
        Manage your portfolio content from here
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="group bg-gray-900 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-600 cursor-pointer p-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="text-blue-400 group-hover:text-white transition">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold">
                {card.title}
              </h3>
            </div>

            <p className="text-gray-400 group-hover:text-gray-100 transition">
              Edit {card.title.toLowerCase()} section
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
