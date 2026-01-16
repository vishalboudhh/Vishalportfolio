import { useEffect, useState } from "react";
import { getAbout } from "../../api/about";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then((res) => setAbout(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Escape regex safely
  const escapeRegex = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const renderText = (text) => {
    let result = text;

    (about?.highlights || []).forEach(({ word, color }) => {
      const safeWord = escapeRegex(word);
      const regex = new RegExp(`(${safeWord})`, "g");

      result = result.replace(
        regex,
        `<span style="color:${color}; font-weight:600">$1</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="bg-black text-white px-6 md:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-md shadow-lg rounded-xl p-8 md:p-12">

        {/* Title (Always Visible) */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          About Me
        </h2>

        {/* Content */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-11/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-9/12" />
          </div>
        ) : (
          <p className="text-md md:text-xl leading-relaxed text-justify">
            {renderText(about?.content)}
          </p>
        )}

      </div>
    </div>
  );
};

export default About;
