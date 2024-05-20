import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST'],
  },
  // pingTimeout: 60000, // 60 saniye sonra bağlantıyı keser
  // pingInterval: 25000, // 25 saniyede bir ping atar
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const { userId } = socket.handshake.query;
  if (userId !== 'undefined') userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
