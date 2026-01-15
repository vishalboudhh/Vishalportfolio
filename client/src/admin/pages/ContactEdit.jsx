import { useEffect, useState } from "react";
import { getContact, updateContact } from "../../api/contact";
import { Plus, Trash2, Save } from "lucide-react";

const ContactEdit = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ---------- */
  useEffect(() => {
    getContact()
      .then((res) => {
        const data = res.data.data;
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setSocials(data.socials || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------- ADD SOCIAL ---------- */
  const addSocial = () => {
    setSocials([
      ...socials,
      { name: "", icon: "", link: "" },
    ]);
  };

  /* ---------- UPDATE SOCIAL ---------- */
  const updateSocial = (index, key, value) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], [key]: value };
    setSocials(updated);
  };

  /* ---------- REMOVE SOCIAL ---------- */
  const removeSocial = (index) => {
    const updated = socials.filter((_, i) => i !== index);
    setSocials(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    try {
      await updateContact({
        email,
        phone,
        socials,
      });
      alert("Contact updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-white">Loading contact...</p>;
  }

  return (
    <div className="text-white space-y-8 max-w-4xl">
      <h2 className="text-3xl font-bold">Edit Contact</h2>

      {/* EMAIL & PHONE */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />

        <input
          className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />
      </div>

      {/* SOCIAL LINKS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Social Links</h3>

          <button
            onClick={addSocial}
            className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} /> Add Social
          </button>
        </div>

        {socials.map((social, index) => (
          <div
            key={index}
            className="grid md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl"
          >
            <input
              placeholder="Name (LinkedIn)"
              value={social.name}
              onChange={(e) =>
                updateSocial(index, "name", e.target.value)
              }
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              placeholder="Icon URL"
              value={social.icon}
              onChange={(e) =>
                updateSocial(index, "icon", e.target.value)
              }
              className="bg-black border border-gray-700 px-3 py-2 rounded"
            />

            <input
              placeholder="Profile link"
              value={social.link}
              onChange={(e) =>
                updateSocial(index, "link", e.target.value)
              }
              className="bg-black border border-gray-700 px-3 py-2 rounded col-span-1 md:col-span-1"
            />

            <button
              onClick={() => removeSocial(index)}
              className="flex justify-center items-center text-red-400 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg flex items-center gap-2"
      >
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

export default ContactEdit;
