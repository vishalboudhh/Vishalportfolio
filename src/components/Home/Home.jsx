import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { Link } from "react-router-dom";

const Home = () => {
  const handleDownloadCV = () => {
    window.open(
      "https://drive.google.com/file/d/1-A07Q1rygwLl9rUlsa6huQw4cC8fahLs/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <div className='bg-black h-[595px] overflow-hidden text-white flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 py-6 md:py-0 gap-6'>
      
      {/* Text Section */}
      <div className='w-full md:w-1/2'>
        <h1 className='text-3xl md:text-6xl font-bold leading-tight'>
          Hello, I'm Vishal
        </h1>
        <p className='text-lg md:text-xl mt-4'>
          I am a Full Stack Developer and Software Developer
        </p>

        {/* Social Icons */}
        <div className='flex mt-6'>
          <ul className='flex gap-4 text-2xl'>
            <li>
              <a
                href='https://www.linkedin.com/in/vishal-meshram-67a99b227/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-blue-400 transition'
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href='https://github.com/vishalboudhh'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-300 transition'
              >
                <FiGithub />
              </a>
            </li>
            <li>
              <a
                href='https://leetcode.com/vishalmeshram298/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-orange-400 transition'
              >
                <SiLeetcode />
              </a>
            </li>
            <li>
              <a
                href='https://www.geeksforgeeks.org/user/vishalmesj08n/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-green-400 transition'
              >
                <SiGeeksforgeeks className="text-3xl" />
              </a>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className='flex flex-row sm:flex-row gap-4 mt-8'>
          <Link to='/contect'>
            <button className='cursor-pointer bg-gradient-to-r from-green-500 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition'>
              Hire Me
            </button>
          </Link>
          <button
            onClick={handleDownloadCV}
            className='cursor-pointer bg-gradient-to-r from-blue-400 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition'
          >
            Download CV
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96'>
        <img
          className='w-full rounded-3xl object-cover duration-300 hover:scale-105'
          src='https://media.licdn.com/dms/image/v2/D4D03AQGRKx624qt0nA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693910085890?e=1756339200&v=beta&t=4BFTKzb3ewfJXsB6hqyHrKUNEgkO_2Ckj0vPdpyiMu4'
          alt='Vishal Meshram profile'
        />
      </div>
    </div>
  );
};

export default Home;
