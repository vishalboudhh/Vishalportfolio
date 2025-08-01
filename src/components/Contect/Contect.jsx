import React from 'react';
import { FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
const Contact = () => {
  const contacts = [
    {
      type: 'Email',
      value: 'vishalmeshram2111@gmail.com',
      icon: <MdEmail size={24} className="text-red-400" />,
      link: 'mailto:vishalmeshram2111@gmail.com',
    },
    {
      type: 'Phone',
      value: '+91 9981434150',
      icon: <MdPhone size={24} className="text-green-400" />,
      link: 'tel:+91 9981434150',
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={28} />,
      link: 'https://www.linkedin.com/in/vishal-meshram-67a99b227/',
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      icon: <FaGithub size={28} />,
      link: 'https://github.com/vishalboudhh',
      color: 'hover:text-gray-500',
    },
    {
      name: 'Leetcode',
      icon: <SiLeetcode size={28} />,
      link: 'https://leetcode.com/vishalmeshram298/', // Optional: update this to your real portfolio link
      color: 'hover:text-orange-400',
    },
     {
      name: 'GeekForGeeks',
      icon: <SiGeeksforgeeks size={32} />,
      link: 'https://www.geeksforgeeks.org/user/vishalmesj08n/', // Optional: update this to your real portfolio link
      color: 'hover:text-green-400',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Contact Me</h2>

      <div className="max-w-xl mx-auto space-y-8">
        {contacts.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition"
          >
            {item.icon}
            <a
              href={item.link}
              className="text-sm md:text-base hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.value}
            </a>
          </div>
        ))}

        <div className="flex justify-center gap-8 mt-10">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white transition transform hover:scale-110 ${social.color}`}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
