import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTools,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMenu2Line, RiCloseLine } from "@remixicon/react";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/dashboard/home", icon: <FaHome /> },
    { name: "About", path: "/dashboard/about", icon: <FaUser /> },
    { name: "Skills", path: "/dashboard/skills", icon: <FaTools /> },
    { name: "Experience", path: "/dashboard/experience", icon: <FaBriefcase /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FaProjectDiagram /> },
    { name: "Contact", path: "/dashboard/contact", icon: <FaEnvelope /> },
  ];

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === path
      ? "bg-gradient-to-r from-green-400 to-blue-400 text-black font-semibold"
      : "hover:bg-white/10 text-white"
    }`;

  return (
    <>
      {/* MOBILE HAMBURGER (LEFT) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setOpen(true)}
      >
        <RiMenu2Line size={28} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-black text-white p-4 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <Link to={'/dashboard'}>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <RiCloseLine size={26} />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-2 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass(link.path)}
              onClick={() => setOpen(false)}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 mt-6 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
