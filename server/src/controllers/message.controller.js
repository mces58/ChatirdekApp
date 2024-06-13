import { validationResult } from 'express-validator';

import Conversation from 'src/models/conversation.model';
import Message from 'src/models/message.model';
import User from 'src/models/user.model';
import { getReceiverSocketId, io } from 'src/socket/socket';
import { uploadImage } from 'src/utils/cloudinary.util';
import handleErrors from 'src/utils/error.util';
import removeLocalImage from 'src/utils/removeLocalImage.util';

export const getMessages = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;

  try {
    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!selectedUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, selectedUserId] },
    }).populate('messages');

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'No messages found',
      });
    }

    const { messages } = conversation;

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;
  const { message } = req.body;

  try {
    if (currentUserId === selectedUserId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send a message to yourself',
      });
    }

    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!selectedUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const areFriends =
      selectedUser.friends.includes(currentUserId) &&
      currentUser.friends.includes(selectedUserId);

    if (!areFriends) {
      return res.status(403).json({
        success: false,
        message: 'You are not friends with this user',
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, selectedUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [currentUserId, selectedUserId],
      });
    }

    const newMessage = new Message({
      senderId: currentUserId,
      receiverId: selectedUserId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(selectedUserId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendImageMessage = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;
  const image = req.file;

  try {
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    if (currentUserId === selectedUserId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send an image to yourself',
      });
    }

    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!selectedUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const areFriends =
      selectedUser.friends.includes(currentUserId) &&
      currentUser.friends.includes(selectedUserId);

    if (!areFriends) {
      return res.status(403).json({
        success: false,
        message: 'You are not friends with this user',
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, selectedUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [currentUserId, selectedUserId],
      });
    }

    const url = await uploadImage(image);

    const newMessage = new Message({
      senderId: currentUserId,
      receiverId: selectedUserId,
      image: url,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(selectedUserId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json({
      success: true,
      data: newMessage,
    });

    removeLocalImage(image.path);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getLastMessage = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;

  try {
    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!selectedUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, selectedUserId] },
    }).populate('messages');

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'No messages found',
      });
    }

    const { messages } = conversation;
    const lastMessage = messages[messages.length - 1];

    res.status(200).json({
      success: true,
      data: lastMessage,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
