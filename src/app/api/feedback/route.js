import { connectDB } from "@/lib/mongodb/mongoose";
import Feedback from "@/lib/models/feedback.model";
import { sendFeedbackEmail } from "@/lib/feedback/email";
import { createFeedbackHandler } from "@/lib/feedback/handler.mjs";

export const runtime = "nodejs";

export const POST = createFeedbackHandler({
  saveFeedback: async data => {
    await connectDB();
    return Feedback.create(data);
  },
  notifyFeedback: sendFeedbackEmail,
  updateNotification: (id, notificationStatus) => Feedback.findByIdAndUpdate(id, { notificationStatus }),
});
