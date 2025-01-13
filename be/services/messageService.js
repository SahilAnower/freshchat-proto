import Message from "../models/Message.js";
import { getSocketIdFromUserId, io } from "../socket/socket.js";

class MessageService {
  constructor() {}

  async #createMessage(bodyData) {
    try {
      const message = await Message.create(bodyData);
      if (!message) {
        return null;
      }
      return message;
    } catch (error) {
      console.error("error in createMessage service ", error?.message);
      return null;
    }
  }

  async sendMessage(bodyData, receiverId) {
    try {
      if (!bodyData.chatId || !bodyData.creatorId || !bodyData.content) {
        return {
          statusCode: 400,
          body: null,
          error: "required fields missing",
        };
      }
      // send message if online directly
      const receiverSocketId = getSocketIdFromUserId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", bodyData);
      }
      // create new message with respective chatId
      const message = await this.#createMessage({
        chatId: bodyData.chatId,
        creator: bodyData.creatorId,
        content: bodyData.content,
      });
      return {
        statusCode: 200,
        body: message,
        error: null,
      };
      // TODO: if not add it to inbox
    } catch (error) {
      console.error("error in sendMessage service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in sendMessage service " + error?.message,
      };
    }
  }

  async getMessages(chatId) {
    try {
      const messages = await Message.find({ chatId }).populate("creator");
      if (!messages) {
        return {
          statusCode: 400,
          body: null,
          error: "cannot get messages for chatId: " + chatId,
        };
      }
      return {
        statusCode: 200,
        body: messages,
        error: null,
      };
    } catch (error) {
      console.error("error in getMessages service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in getMessages service " + error?.message,
      };
    }
  }
}

export default MessageService;
