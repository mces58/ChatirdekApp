import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';
import { io } from 'src/socket/socket';
import { uploadImage } from 'src/utils/cloudinary.util';
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
          .select('message createdAt senderId');

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
      data: {
        messages: groupMessages,
        participants: group.members,
      },
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

    const isMemberOrOwner =
      group.owner._id.toString() === senderId ||
      group.members.some((memberId) => memberId.toString() === senderId);

    if (!isMemberOrOwner) {
      return res.status(403).json({ error: 'You are not a member of this group' });
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
