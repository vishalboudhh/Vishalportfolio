import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHome } from "../../api/home";
import profileImg from "../../assets/profile.jpg";

const Home = () => {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHome()
      .then((res) => {
        const data = res.data.data;

        // Transform social links into an array for easier mapping
        const socials = [
          {
            name: "LinkedIn",
            link: data.linkedin,
            icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
          },
          {
            name: "GitHub",
            link: data.github,
            icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
          },
          {
            name: "LeetCode",
            link: data.leetcode,
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg",
          },
          {
            name: "GeeksforGeeks",
            link: data.gfg,
            icon: "https://img.icons8.com/?size=96&id=AbQBhN9v62Ob&format=png",
          },
        ];

        setHome({ ...data, socials });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm tracking-wide text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!home) return null;

  return (
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
            {home.socials.map((social, idx) => (
              <li key={idx}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="hover:scale-110 transition"
                >
                  <img src={social.icon} alt={social.name} className="w-7 h-7" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          <Link to="/contact">
            <button className="cursor-pointer bg-gradient-to-r from-green-500 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition">
              Hire Me
            </button>
          </Link>

          <a
            href={home.resumeUrl} // use the correct key from backend
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="cursor-pointer bg-gradient-to-r from-blue-400 to-gray-900 text-white font-semibold rounded-3xl py-2 px-6 hover:opacity-90 hover:scale-105 transition">
              Download CV
            </button>
          </a>
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
  );
};

export default Home;
