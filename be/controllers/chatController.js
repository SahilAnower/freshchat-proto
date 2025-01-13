import express from "express";

import { protectRoute } from "../middlewares/protectRoutes.js";
import ChatService from "../services/chatService.js";

const router = express.Router();

const chatService = new ChatService();

router.post("/", protectRoute, async (req, res) => {
  const response = await chatService.createChat(req.body);
  return res.status(response.statusCode).json(response);
});

router.get("/", protectRoute, async (req, res) => {
  const response = await chatService.getChats(req.user);
  return res.status(response.statusCode).json(response);
});

router.patch("/", protectRoute, async (req, res) => {
  const response = await chatService.updateChatById(req.body.chatId, req.body);
  return res.status(response.statusCode).json(response);
});

export default router;
