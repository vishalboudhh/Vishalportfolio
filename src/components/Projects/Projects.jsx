import React from 'react';
import { BiUserCheck } from 'react-icons/bi';
import { FaGithub, FaUserMd, FaTasks } from 'react-icons/fa';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { MdOutlineEmail, MdLibraryBooks, MdOutlineAccountTree } from 'react-icons/md';
import { RiTodoLine } from 'react-icons/ri';

const projects = [
  {
    title: 'Job Portal',
    link: 'https://vishaljobportal.onrender.com/',
    icon: <BiUserCheck className="text-violet-500" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/9423/9423983.png',
    description:
      'Full-stack MERN job portal with role-based authentication, real-time job search/filtering, application tracking, and admin dashboard for managing companies and applicants.',
  },
  {
    title: 'Email Tracker',
    link: 'https://email-tracker-one-woad.vercel.app/',
    icon: <MdOutlineAccountTree className="text-Blue-500" size={28}   />,
   image: "https://cdn-icons-png.flaticon.com/512/7286/7286142.png",
    description:
    'MERN app that helps manage and track email job applications efficiently. Include authentication, profilemanagement, automated job email sending, application tracking dashboard, secure APIs, and a responsive UI in Tailwind CSS.',
  },
  {
    title: 'Chat Application',
    link: 'https://fullstackchatapp-s8ce.onrender.com/login',
    icon: <IoChatbubblesSharp className="text-emerald-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/186/186239.png', // ✅ Direct PNG image link
    description:
      'Real-time MERN chat app with Socket.IO, JWT auth, and responsive UI using React + Tailwind.',
  },
  {
    title: 'Gmail Clone',
    link: 'https://clone-3eeab.web.app/',
    icon: <MdOutlineEmail className="text-red-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/281/281769.png',
    description:
      'React + Firebase clone of Gmail with Google Auth and real-time Firestore syncing.',
  },
  {
    title: 'Doctor Management System',
    link: 'https://doctorappointmentsystem-lq6g.onrender.com/login',
    icon: <FaUserMd className="text-blue-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
    description:
      'MERN-based system with role-based access, doctor approvals, and appointment booking.',
  },
  {
    title: 'Employee Management System',
    link: 'https://ems-five-lemon.vercel.app/',
    icon: <FaTasks className="text-yellow-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    description:
      'React-based system with local storage and dual dashboards for admin and employees.',
  },

  {
    title: 'Book Management System',
    link: 'https://github.com/vishalboudhh/bookManagementsystem',
    icon: <MdLibraryBooks className="text-purple-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png',
    description:
      'Full-stack CRUD book system with secure access and responsive design using Vite.',
  },

  {
    title: 'Todo List',
    link: 'https://vishalmeshram-todolist.netlify.app/',
    icon: <RiTodoLine className="text-pink-400" size={28} />,
    image: 'https://cdn-icons-png.flaticon.com/512/4367/4367031.png',
    description:
      'Simple yet elegant React-based todo list app with local storage and Tailwind styling.',
  },
];

const Projects = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">My Projects</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition duration-300 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start gap-5"
          >
            {/* Icon/Image */}
            <div className="flex-shrink-0">
              <img
                src={project.image}
                alt={`${project.title} icon`}
                className="w-16 h-16 rounded-xl object-contain bg-white/10 p-2"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {project.icon}
                <h3 className="text-xl md:text-2xl font-semibold">{project.title}</h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base mb-4">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
                >
                  {project.link.includes('github') ? 'View Code' : 'Live Demo'}
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
