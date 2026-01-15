import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    techStack: {
      type: [String],
      default: []
    },

    image: {
      type: String, // URL
      required: true
    },

    liveLink: {
      type: String,
      default: ""
    },

    githubLink: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false,
      index: true
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
      index: true
    },

    order: {
      type: Number,
      default: 0,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
