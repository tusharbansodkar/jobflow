const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected"],
      default: "applied",
    },
    location: { type: String, required: true },
    jobUrl: { type: String, required: true },
    notes: { type: String },
    applicationDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
