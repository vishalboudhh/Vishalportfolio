import { RiCloseLine, RiMenu2Line } from '@remixicon/react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const linkClass = (path) =>
    `cursor-pointer hover:text-emerald-400 transition font-semibold ${
      location.pathname === path
        ? 'bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'
        : ''
    }`;

  return (
    <nav className="w-full bg-black text-white px-6 md:px-20 py-4 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-blue-700 to-sky-400 bg-clip-text text-transparent">Vishal Meshram</span> 
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-semibold text-lg">
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <Link to={path} className={linkClass(path)}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <RiMenu2Line
            size={30}
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer transition"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-full h-screen z-50 bg-black/70 md:hidden">
          {/* Sidebar container - slide in from right */}
          <div className="absolute top-0 right-0 h-full w-3/4 max-w-xs bg-black p-6 shadow-lg animate-slide-in-right">
            {/* Close Icon */}
            <div className="flex justify-end mb-6">
              <RiCloseLine
                size={28}
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer"
              />
            </div>

            {/* Sidebar Nav Links */}
            <ul className="flex flex-col gap-4 font-medium text-lg">
              {navLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={linkClass(path)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
