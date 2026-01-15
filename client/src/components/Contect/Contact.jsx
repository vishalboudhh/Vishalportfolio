import { useEffect, useState } from "react";
import { getContact } from "../../api/contact";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContact()
      .then((res) => {
        const data = res.data.data;

        setContact({
          contacts: [
            {
              type: "Email",
              value: data.email,
              link: `mailto:${data.email}`,
              icon: <HiOutlineMail size={24} className="bg-red-500" />,
            },
            {
              type: "Phone",
              value: data.phone,
              link: `tel:${data.phone}`,
              icon: (
                <HiOutlinePhone
                  size={24}
                  className="bg-green-500 rounded-2xl"
                />
              ),
            },
          ],
          socials: data.socials || [],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 tracking-wide">
            Loading Contact...
          </p>
        </div>
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="bg-black min-h-screen text-white px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Contact Me
      </h2>

      <div className="max-w-xl mx-auto space-y-8">
        {contact.contacts.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition"
          >
            <div className="text-white">{item.icon}</div>

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
          {contact.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <img src={social.icon} alt={social.name} className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
