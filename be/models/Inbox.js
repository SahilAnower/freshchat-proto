import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema({
  recipientId: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Inbox = mongoose.model("Inbox", inboxSchema);

export default Inbox;
