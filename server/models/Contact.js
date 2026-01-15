import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    name: {
      type: String, // LinkedIn, GitHub, Twitter, etc.
      required: true
    },
    icon: {
      type: String, // Flaticon / SVG / image URL
      required: true
    },
    link: {
      type: String, // profile URL
      required: true
    }
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    socials: {
      type: [socialSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
