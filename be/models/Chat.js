import mongoose from "mongoose";

// chat will always be between admin and user, so one end is fixed of that of admin.
const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  metadata: {
    type: String,
  },
  chatStatus: {
    type: String,
    enum: ["RESOLVED", "WAITING_ON_INTERNAL", "WAITING_ON_CUSTOMER", "OPEN"],
    default: "WAITING_ON_INTERNAL",
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
