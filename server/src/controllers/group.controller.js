import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';
import User from 'src/models/user.model';

const createGroup = async (req, res) => {
  const { name, members } = req.body;

  try {
    const group = new Group({
      name,
      members,
    });
    await group.save();

    res.status(201).json({ group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id });

    res.status(200).json({ groups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId, members: req.user._id });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendGroupMessage = async (req, res) => {
  const { groupId } = req.params;
  const { message } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId, members: req.user._id });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessage = new GroupMessage({
      groupId,
      message,
      senderId: req.user._id,
    });

    await groupMessage.save();

    res.status(201).json({ groupMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId, members: req.user._id }).populate(
      'members',
      'fullName profilePicture'
    );

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMessages = await GroupMessage.find({ groupId });

    res.status(200).json({
      groupMessages,
      participants: group.members,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addGroupMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId, owner: req.user._id });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    group.members.push(userId);

    await group.save();

    res.status(200).json({ group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeGroupMember = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId, owner: req.user._id });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    group.members = group.members.filter((memberId) => memberId.toString() !== userId);

    await group.save();

    res.status(200).json({ group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const leaveGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId, members: req.user._id });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    group.members = group.members.filter(
      (memberId) => memberId.toString() !== req.user._id
    );

    await group.save();

    res.status(200).json({ group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createGroup,
  getGroups,
  getGroup,
  sendGroupMessage,
  getGroupMessages,
  addGroupMember,
  removeGroupMember,
  leaveGroup,
};
