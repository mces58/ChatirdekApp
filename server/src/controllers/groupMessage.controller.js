import Group from 'src/models/group.model';
import GroupMessage from 'src/models/groupMessage.model';

export const sendGroupMessage = async (req, res) => {
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

export const getGroupMessages = async (req, res) => {
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
