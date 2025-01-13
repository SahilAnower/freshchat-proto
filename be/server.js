import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import auth from "./controllers/authController.js";
import chat from "./controllers/chatController.js";
import message from "./controllers/messageController.js";

import connectMongo from "./configs/mongoConfig.js";

import { app, server } from "./socket/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/chat", chat);
app.use("/api/message", message);

const port = process.env.PORT || 8080;

server.listen(port, async () => {
  await connectMongo();
  console.log(`Server 🚀 and running on http://localhost:${port}`);
});
