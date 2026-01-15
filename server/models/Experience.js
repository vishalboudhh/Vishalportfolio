import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      default: null
    },

    isCurrent: {
      type: Boolean,
      default: false
    },

    description: {
      type: [String], // bullet points
      required: true
    },

    techStack: {
      type: [String], // React, Node, MongoDB
      default: []
    },

    order: {
      type: Number,
      default: 0,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
