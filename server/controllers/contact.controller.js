import Contact from "../models/Contact.js";

/* ---------- GET CONTACT INFO (Public) ---------- */
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().lean();

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error("Get Contact Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact info"
    });
  }
};

/* ---------- UPSERT CONTACT INFO (Admin) ---------- */
export const upsertContact = async (req, res) => {
  try {
    const { email, phone, socials } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required"
      });
    }

    const contact = await Contact.findOneAndUpdate(
      {},
      { email, phone, socials },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact info updated successfully",
      data: contact
    });
  } catch (error) {
    console.error("Upsert Contact Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update contact info"
    });
  }
};
