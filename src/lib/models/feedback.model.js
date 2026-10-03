import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, maxlength: 254 },
  message: { type: String, required: true, trim: true, maxlength: 500 },
  notificationStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
