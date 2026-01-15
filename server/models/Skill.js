import mongoose from "mongoose";

/* ---------- Embedded Skill ---------- */
const skillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

/* ---------- Skill Category ---------- */
const skillCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true // 🔥 fast category lookup
    },
    skills: {
      type: [skillItemSchema],
      default: []
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Skill", skillCategorySchema);
