import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import dotEnvConfig from 'src/configs/dotEnv.config';
import Conversation from 'src/models/conversation.model';
import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';
import Message from 'src/models/message.model';
import User from 'src/models/user.model';
import logger from 'src/utils/logger.util';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://${dotEnvConfig.HOST}:${dotEnvConfig.PORT}`],
    methods: ['GET', 'POST'],
  },
});

const onlineUsers = {};
const socketToUser = {};

io.on('connection', (socket) => {
  onlineUsers[socket.id] = socket.id;
  logger.info(`User connected${socket.id}`);

  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    try {
      if (senderId === receiverId) {
        throw new Error('You cannot send a message to yourself');
      }

      const [currentUser, selectedUser] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId),
      ]);

      if (!selectedUser || !currentUser) {
        throw new Error('User not found');
      }

      const areFriends =
        selectedUser.friends.includes(senderId) &&
        currentUser.friends.includes(receiverId);

      if (!areFriends) {
        throw new Error('You are not friends with this user');
      }

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      conversation.messages.push(newMessage._id);

      await Promise.all([newMessage.save(), conversation.save()]);
      socket.emit('messageSent', { success: true, data: newMessage });
    } catch (error) {
      socket.emit('messageError', { success: false, message: error.message });
    }
  });

  socket.on('getMessages', async ({ senderId, receiverId }) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate('messages');

      if (!conversation) {
        return socket.emit('getMessagesError', {
          success: false,
          message: 'Conversation not found',
        });
      }

      socket.emit('messages', { success: true, data: conversation.messages });
    } catch (error) {
      socket.emit('getMessagesError', { success: false, message: error.message });
    }
  });

  socket.on('getGroupMessages', async ({ groupId }) => {
    try {
      const group = await Group.findOne({ _id: groupId }).populate('members');

      if (!group) {
        return socket.emit('groupMessages', {
          success: false,
          error: 'Group not found',
        });
      }

      const groupMessages = await GroupMessage.find({ groupId }).populate('senderId');

      socket.emit('groupMessages', {
        success: true,
        data: {
          messages: groupMessages,
          participants: group.members,
        },
      });
    } catch (error) {
      socket.emit('getGroupMessagesError', { success: false, message: error.message });
    }
  });

  socket.on('sendGroupMessage', async ({ senderId, groupId, message }) => {
    try {
      const group = await Group.findOne({ _id: groupId });
      if (!group) {
        return socket.emit('groupMessageResponse', {
          success: false,
          error: 'Group not found',
        });
      }

      const isMemberOrOwner =
        group.owner._id.toString() === senderId ||
        group.members.some((memberId) => memberId.toString() === senderId);

      if (!isMemberOrOwner) {
        return socket.emit('groupMessageResponse', {
          success: false,
          error: 'You are not a member of this group',
        });
      }

      const groupMessage = new GroupMessage({
        groupId,
        senderId,
        message,
      });

      await groupMessage.save();

      io.to(groupId).emit('newGroupMessage', groupMessage);

      socket.emit('groupMessageResponse', {
        success: true,
        data: groupMessage,
      });
    } catch (error) {
      socket.emit('sendGroupMessageError', { success: false, message: error.message });
    }
  });

  socket.on('startTyping', ({ senderId, receiverId, isTyping }) => {
    socket.broadcast.emit('startTyping', { senderId, receiverId, isTyping });
  });

  socket.on('stopTyping', ({ senderId, receiverId, isTyping }) => {
    socket.broadcast.emit('stopTyping', { senderId, receiverId, isTyping });
  });

  socket.on('userLogin', async ({ userId }) => {
    onlineUsers[userId] = socket.id;
    socketToUser[socket.id] = userId;
    io.emit('onlineUsers', Object.keys(onlineUsers));
  });

  socket.on('userLogout', async ({ userId }) => {
    const socketId = onlineUsers[userId];
    if (socketId) {
      delete onlineUsers[userId];
      delete socketToUser[socketId];
    }
    io.emit('onlineUsers', Object.keys(onlineUsers));
  });

  socket.on('getOnlineUsers', () => {
    socket.emit('onlineUsers', Object.keys(onlineUsers));
  });

  socket.on('disconnect', () => {
    const userId = socketToUser[socket.id];
    if (userId) {
      delete onlineUsers[userId];
      delete socketToUser[socket.id];
    }
    io.emit('onlineUsers', Object.keys(onlineUsers));
  });
});

export { app, io, server };
