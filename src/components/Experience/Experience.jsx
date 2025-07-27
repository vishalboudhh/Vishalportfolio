import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    role: 'MERN Stack Developer Intern',
    company: 'Logical Softtech Pvt Ltd',
    duration: 'January 2025 – April 2025 (4 months)',
    points: [
      'Contributed to the development and deployment of a live web application using the MERN stack.',
      'Built and maintained RESTful APIs with Node.js and Express, facilitating seamless client–server communication.',
      'Designed and implemented reusable UI components in React, improving the user experience and application performance.',
      'Managed data schemas and queries in MongoDB, ensuring efficient storage and retrieval of application data.',
    ],
  },
  
  // You can easily add more experiences here
];

const Experience = () => {
  return (
    <div className="text-white bg-black min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Experience</h2>

      <div className="space-y-10 justify-center items-center">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-white/10  transition rounded-xl p-6 md:p-10 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaBriefcase size={30} className="text-emerald-400" />
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{exp.role}</h3>
                <p className="text-sm md:text-base text-gray-300">
                  {exp.company} — {exp.duration}
                </p>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-2 text-sm md:text-base leading-relaxed">
              {exp.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
