import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHome } from "../../api/home";
import profileImg from "../../assets/profile.jpg";


const Home = () => {
  const [home, setHome] = useState(null);

  useEffect(() => {
    getHome()
      .then((res) => setHome(res.data.data))
      .catch(console.error);
  }, []);

  if (!home) return null;

  return (
    <>
      
      <div className="bg-black h-[595px] overflow-hidden text-white flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 py-22 md:py-0 gap-6">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Hello, I'm Vishal
            </span>
          </h1>

          <p className="text-sm font-bold md:text-xl mt-4">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent">
              I am a Software Developer
            </span>
          </p>

          {/* Social Icons */}
          <div className="flex mt-6 justify-center">
            <ul className="flex gap-4 text-2xl">
              {(home.socials || []).map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="hover:scale-110 transition"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-7 h-7"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <Link to="/contact">
              <button className="cursor-pointer bg-gradient-to-r from-green-500 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition">
                Hire Me
              </button>
            </Link>

            <button
              onClick={() => window.open(home.cvLink, "_blank")}
              className="cursor-pointer bg-gradient-to-r from-blue-400 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition"
            >
              Download CV
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96">
          <img
            src={profileImg}
            alt="Vishal Meshram profile"
            className="w-full rounded-3xl object-cover duration-300 hover:scale-105"
          />
        </div>
      </div>
    </>

  );
};

export default Home;
