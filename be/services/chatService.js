import Chat from "../models/Chat.js";

class ChatService {
  constructor() {}

  async createChat(bodyData) {
    try {
      const chat = await Chat.create(bodyData);
      if (!chat) {
        return {
          statusCode: 400,
          body: null,
          error: "error in creating chat",
        };
      }
      return {
        statusCode: 200,
        body: chat,
        error: null,
      };
    } catch (error) {
      console.error("error in createChat service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in createChat service " + error?.message,
      };
    }
  }

  async getChats(user) {
    try {
      const isAdmin = user.userType === "ADMIN";
      let body = null;
      if (isAdmin) {
        // call to getChats for admin
        body = await this.#getChatsForCompany();
      } else {
        // call to getChat for user
        body = await this.#getChatsForUser(user._id);
      }
      if (!body) {
        return {
          statusCode: 400,
          body: null,
          error: "cannot get chats",
        };
      }
      return {
        statusCode: 200,
        body: body,
        error: null,
      };
    } catch (error) {
      console.error("error in getChats service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in getChats service " + error?.message,
      };
    }
  }

  async #getChatsForUser(userId) {
    try {
      const chat = await Chat.findOne({ userId }).populate("userId");
      if (!chat) {
        return null;
      }
      return chat;
    } catch (error) {
      console.error("error in getChatsForUser service ", error?.message);
      return null;
    }
  }

  async #getChatsForCompany() {
    try {
      const chats = await Chat.find({}).populate("userId");
      if (!chats) {
        return null;
      }
      return chats;
    } catch (error) {
      console.error("error in getChatsForCompany service ", error?.message);
      return null;
    }
  }

  async getChatById(chatId) {
    try {
      const chat = await Chat.findById(chatId).populate("userId");
      if (!chat) {
        return {
          statusCode: 400,
          body: null,
          error: "cannot get chat for chatid: " + chatId,
        };
      }
      return {
        statusCode: 200,
        body: chat,
        error: null,
      };
    } catch (error) {
      console.error("error in getChatById service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in getChatById service " + error?.message,
      };
    }
  }

  async updateChatById(chatId, bodyData) {
    try {
      const chat = await Chat.findByIdAndUpdate(chatId, bodyData, {
        new: true,
      });
      if (!chat) {
        return {
          statusCode: 400,
          body: null,
          error: "cannot update chat for chatid: " + chatId,
        };
      }
      return {
        statusCode: 200,
        body: chat,
        error: null,
      };
    } catch (error) {
      console.error("error in updateChatById service ", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "error in updateChatById service " + error?.message,
      };
    }
  }
}

export default ChatService;
