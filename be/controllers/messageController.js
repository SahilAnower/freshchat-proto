import express from "express";

import { protectRoute } from "../middlewares/protectRoutes.js";
import MessageService from "../services/messageService.js";

const router = express.Router();

const messageService = new MessageService();

router.post("/", protectRoute, async (req, res) => {
  const response = await messageService.sendMessage(
    req.body,
    req.body.receiverId
  );
  return res.status(response.statusCode).json(response);
});

router.get("/:chatId", protectRoute, async (req, res) => {
  const response = await messageService.getMessages(req.params.chatId);
  return res.status(response.statusCode).json(response);
});

export default router;
