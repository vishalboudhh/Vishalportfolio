import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    highlights: {
      type: [highlightSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

/* Enforce single about document */
aboutSchema.index({}, { unique: true });

export default mongoose.model("About", aboutSchema);
