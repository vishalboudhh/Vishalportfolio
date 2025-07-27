import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaPython,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiJavascript,
  SiRedux,
  SiMongodb,
  SiExpress,
  SiMysql,
  SiPostman,
  SiFirebase,
  SiTailwindcss,
  SiSocketdotio,
  SiRender,
  SiVercel,
  SiNetlify,
} from 'react-icons/si';
import { MdApi } from 'react-icons/md';
import { VscVscode } from 'react-icons/vsc';
import { MdElectricBolt } from "react-icons/md";

const Skills = () => {
  const skills = [
    {
      title: 'Languages',
      items: [
        { name: 'C/C++', icon: SiCplusplus, className: 'text-blue-300' },
        { name: 'JavaScript', icon: SiJavascript, className: 'text-yellow-400' },
        { name: 'Python', icon: FaPython, className: 'text-blue-300' },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React', icon: FaReact, className: 'text-cyan-400' },
        { name: 'Redux Toolkit', icon: SiRedux, className: 'text-purple-500' },
        { name: 'HTML5', icon: FaHtml5, className: 'text-orange-500' },
        { name: 'CSS3', icon: FaCss3Alt, className: 'text-blue-500' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, className: 'text-teal-400' },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'Node.js', icon: FaNodeJs, className: 'text-green-500' },
        { name: 'Express.js', icon: SiExpress, className: 'text-gray-300' },
        { name: 'Socket.IO', icon: SiSocketdotio, className: 'text-white' },
        { name: 'REST API', icon: MdApi, className: 'text-red-400' },
      ],
    },
    {
      title: 'Database',
      items: [
        { name: 'MongoDB', icon: SiMongodb, className: 'text-green-400' },
        { name: 'MySQL', icon: SiMysql, className: 'text-blue-300' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git', icon: FaGitAlt, className: 'text-orange-400' },
        { name: 'GitHub', icon: FaGithub, className: 'text-gray-300' },
        { name: 'VS Code', icon: VscVscode, className: 'text-blue-400' },
        { name: 'Postman', icon: SiPostman, className: 'text-orange-500' },
        { name: 'Thunder Client', icon: MdElectricBolt, className: 'text-orange-500' },
        { name: 'Firebase', icon: SiFirebase, className: 'text-yellow-400' },
      ],
    },
    {
      title: 'Deployment',
      items: [
        { name: 'Render', icon: SiRender, className: 'text-purple-300' },
        { name: 'Vercel', icon: SiVercel, className: 'text-white' },
        { name: 'Netlify', icon: SiNetlify, className: 'text-green-300' },
        { name: 'Firebase', icon: SiFirebase, className: 'text-yellow-400' },
      ],
    },
  ];

  return (
    <div className="text-white bg-black min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">My Skills</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {skills.map((group) => (
          <div key={group.title}>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">{group.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-lg shadow-sm"
                >
                  <skill.icon size={28} className={skill.className} />
                  <span className="text-sm md:text-base">{skill.name}</span>
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
