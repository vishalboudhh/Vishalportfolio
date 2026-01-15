import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    github: {
      type: String,
      trim: true,
      default: ""
    },
    leetcode: {
      type: String,
      trim: true,
      default: ""
    },
    gfg: {
      type: String,
      trim: true,
      default: ""
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

/* 
 Enforce single document
 This prevents multiple home records
*/
homeSchema.index({}, { unique: true });

export default mongoose.model("Home", homeSchema);
