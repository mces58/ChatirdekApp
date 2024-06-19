import path from 'path';

import Conversation from 'src/models/conversation.model';
import Message from 'src/models/message.model';
import User from 'src/models/user.model';
import base64ToImage from 'src/utils/base64ToImage.util';
import { uploadImage } from 'src/utils/cloudinary.util';
import handleErrors from 'src/utils/error.util';
import removeLocalImage from 'src/utils/removeLocalImage.util';

export const getLastMessages = async (req, res) => {
  const { id: currentUserId } = req.user;

  try {
    const currentUser = await User.findById(currentUserId).populate('friends');

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const friendsIds = currentUser.friends.map((friend) => friend._id);

    if (!friendsIds.length) {
      return res.status(404).json({
        success: false,
        message: 'No friends found',
      });
    }

    const conversations = await Conversation.find({
      participants: { $in: [currentUserId] },
      $or: [{ participants: { $in: friendsIds } }],
    })
      .populate({
        path: 'messages',
        select: 'senderId receiverId message image createdAt',
      })
      .populate({
        path: 'participants',
        model: 'User',
      });

    if (!conversations.length) {
      return res.status(404).json({
        success: false,
        message: 'No conversations found',
      });
    }

    const lastMessages = conversations.map((conversation) => {
      const { messages, participants } = conversation;
      const lastMessage = messages[messages.length - 1];
      const receiver = participants.find(
        (participant) => participant._id.toString() !== currentUserId
      );
      return {
        receiver,
        lastMessage: {
          senderId: lastMessage.senderId,
          receiverId: lastMessage.receiverId,
          message: lastMessage.message,
          image: lastMessage.image,
          createdAt: lastMessage.createdAt,
        },
      };
    });

    res.status(200).json({
      success: true,
      data: lastMessages,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendImageMessage = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;
  const { uri } = req.body;

  const filePath = path.join(__dirname, `../assets/${Date.now()}.png`);
  const convertedImagePath = base64ToImage(uri, filePath);
  const secureUri = await uploadImage(convertedImagePath);

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
      image: secureUri,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([newMessage.save(), conversation.save()]);
    res.status(201).json({
      success: true,
      data: newMessage,
    });

    removeLocalImage(convertedImagePath);
  } catch (error) {
    handleErrors(res, error);
  }
};
