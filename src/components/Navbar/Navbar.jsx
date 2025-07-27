import { RiCloseLine, RiMenu2Line } from '@remixicon/react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // to highlight active link

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contect' },
  ];

  const linkClass = (path) =>
    `cursor-pointer hover:text-emerald-400 transition font-semibold ${location.pathname === path
      ? 'bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'
      : ''
    }`;


  return (
    <nav className='w-full bg-black text-white px-6 md:px-20 py-4 shadow-md'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='text-2xl md:text-3xl font-bold tracking-wide'>
          Vishal Meshram
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-8 font-semibold text-lg'>
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <Link to={path} className={linkClass(path)}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div className='md:hidden'>
          {isMenuOpen ? (
            <RiCloseLine
              size={30}
              onClick={() => setIsMenuOpen(false)}
              className='cursor-pointer transition'
            />
          ) : (
            <RiMenu2Line
              size={30}
              onClick={() => setIsMenuOpen(true)}
              className='cursor-pointer transition'
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className='flex flex-col gap-4 mt-4 font-medium text-center md:hidden bg-black/90 p-4 rounded-md shadow-lg animate-slide-down'>
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
      )}
    </nav>
  );
};

export default Navbar;
