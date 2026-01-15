import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* ---------- Admin Login ---------- */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ---- Validation ---- */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    /* ---- Find user ---- */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    /* ---- Compare password ---- */
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    /* ---- Generate token ---- */
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
