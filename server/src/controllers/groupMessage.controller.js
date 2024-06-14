import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';
import { io } from 'src/socket/socket';
import { uploadImage } from 'src/utils/cloudinary.util';
import handleErrors from 'src/utils/error.util';
import removeLocalImage from 'src/utils/removeLocalImage.util';

export const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId }).populate('members');

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessages = await GroupMessage.find({ groupId }).populate('senderId');

    res.status(200).json({
      success: true,
      data: groupMessages,
      participants: group.members,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendGroupMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId } = req.params;
  const { message } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessage = new GroupMessage({
      groupId,
      senderId,
      message,
    });

    await groupMessage.save();

    io.to(groupId).emit('newGroupMessage', groupMessage);

    res.status(201).json({
      success: true,
      data: groupMessage,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendGroupImageMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId } = req.params;
  const image = req.file;

  try {
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const url = await uploadImage(image);

    const groupMessage = new GroupMessage({
      groupId,
      senderId,
      image: url,
    });

    await groupMessage.save();

    io.to(groupId).emit('newGroupMessage', groupMessage);

    res.status(201).json({
      success: true,
      data: groupMessage,
    });

    removeLocalImage(image.path);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getGroupLastMessage = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId }).populate('members');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessage = await GroupMessage.findOne({ groupId })
      .sort({ createdAt: -1 })
      .populate('senderId');

    res.status(200).json({
      success: true,
      data: groupMessage,
      participants: group.members,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
