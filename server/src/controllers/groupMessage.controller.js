import path from 'path';

import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';
import { base64ToImage, base64ToSound } from 'src/utils/base64ToImage.util';
import { uploadImage, uploadSound } from 'src/utils/cloudinary.util';
import handleErrors from 'src/utils/error.util';
import removeLocalImage from 'src/utils/removeLocalImage.util';

export const getGroupLastMessage = async (req, res) => {
  const { id } = req.user;
  try {
    const groups = await Group.find({
      $or: [{ owner: id }, { members: id }],
    })
      .populate({
        path: 'members',
        select: '-password',
      })
      .populate({
        path: 'owner',
        select: '-password',
      });

    if (!groups) {
      return res.status(404).json({ error: 'No groups found' });
    }

    const groupsWithLastMessage = await Promise.all(
      groups.map(async (group) => {
        const lastMessage = await GroupMessage.findOne({ groupId: group._id })
          .sort({ createdAt: -1 })
          .populate('senderId')
          .select('message createdAt senderId image audio');

        return {
          ...group.toObject(),
          lastMessage,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: groupsWithLastMessage,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendGroupImageMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId } = req.params;
  const { uri } = req.body;

  const filePath = path.join(__dirname, `../assets/${Date.now()}.png`);
  const convertedImagePath = base64ToImage(uri, filePath);
  const secureUri = await uploadImage(convertedImagePath);
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessage = new GroupMessage({
      groupId,
      senderId,
      image: secureUri,
    });

    await groupMessage.save();

    res.status(201).json({
      success: true,
      data: groupMessage,
    });

    removeLocalImage(convertedImagePath);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendGroupAudioMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId } = req.params;
  const { uri } = req.body;

  const filePath = path.join(__dirname, `../assets/${Date.now()}.mp4`);
  const convertedSoundPath = base64ToSound(uri, filePath);
  const secureUri = await uploadSound(convertedSoundPath);
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessage = new GroupMessage({
      groupId,
      senderId,
      audio: secureUri,
    });

    await groupMessage.save();

    res.status(201).json({
      success: true,
      data: groupMessage,
    });

    removeLocalImage(convertedSoundPath);
  } catch (error) {
    handleErrors(res, error);
  }
};
