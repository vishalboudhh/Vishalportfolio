import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//public route
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Contact from './components/Contect/Contact';

//Admins
import Login from './admin/Login';
import PrivateRoute from './admin/PrivateRoute';
import DashboardLayout from './admin/DashboardLayout';
import DashboardHome from './admin/DashboardHome';

//Admin pages
import HomeEdit from './admin/pages/HomeEdit';
import AboutEdit from './admin/pages/AboutEdit';
import SkillsEdit from './admin/pages/SkillsEdit';
import ExperienceEdit from './admin/pages/ExperienceEdit';
import ProjectsEdit from './admin/pages/ProjectsEdit';
import ContactEdit from './admin/pages/ContactEdit';


function App() {
  return (
    <Router>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />

        <Route path="/login" element={<Login />} />
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
    </Router>
  );
}

export default App;
