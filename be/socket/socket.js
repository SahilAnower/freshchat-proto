import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

export const getSocketIdFromUserId = (userId) => {
  if (userSocketMap.has(userId)) {
    return userSocketMap.get(userId);
  }
  return null;
};

export const getSocketFromSocketId = (socketId) => {
  if (socketIdToSocketMap.has(socketId)) {
    return socketIdToSocketMap.get(socketId);
  }
  return null;
};

const userSocketMap = new Map();
const socketIdToSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap.set(userId, socket.id);
  }

  if (socket && socket.id) {
    socketIdToSocketMap.set(socket.id, socket);
  }

  socket.on("disconnect", async () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

export { app, io, server };
