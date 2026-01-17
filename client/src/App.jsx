import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

/* ---------------- SHARED ---------------- */
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./admin/PrivateRoute";
import DashboardLayout from "./admin/DashboardLayout";

/* ---------------- PUBLIC PAGES (LAZY) ---------------- */
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contect/Contact"));

/* ---------------- ADMIN ---------------- */
const Login = lazy(() => import("./admin/Login"));
const DashboardHome = lazy(() => import("./admin/DashboardHome"));

/* ---------------- ADMIN EDIT PAGES ---------------- */
const HomeEdit = lazy(() => import("./admin/pages/HomeEdit"));
const AboutEdit = lazy(() => import("./admin/pages/AboutEdit"));
const SkillsEdit = lazy(() => import("./admin/pages/SkillsEdit"));
const ExperienceEdit = lazy(() => import("./admin/pages/ExperienceEdit"));
const ProjectsEdit = lazy(() => import("./admin/pages/ProjectsEdit"));
const ContactEdit = lazy(() => import("./admin/pages/ContactEdit"));

function App() {
  return (
    <Router>
      {/* 🔥 TOASTER MUST BE RENDERED */}
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3500,
    style: {
      background: "linear-gradient(135deg, #0f172a, #020617)",
      color: "#e5e7eb",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: 500,
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#020617",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#020617",
      },
    },
    loading: {
      iconTheme: {
        primary: "#38bdf8",
        secondary: "#020617",
      },
    },
  }}
/>


      <Navbar />

      <Suspense fallback={<div className="text-white p-5">Loading...</div>}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="home" element={<HomeEdit />} />
            <Route path="about" element={<AboutEdit />} />
            <Route path="skills" element={<SkillsEdit />} />
            <Route path="experience" element={<ExperienceEdit />} />
            <Route path="projects" element={<ProjectsEdit />} />
            <Route path="contact" element={<ContactEdit />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
