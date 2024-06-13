import Group from 'src/models/group.model';
import User from 'src/models/user.model';
import handleErrors from 'src/utils/error.util';

export const createGroup = async (req, res) => {
  const owner = req.user.id;
  const { name, members } = req.body;

  try {
    const ownerExists = await User.findById(owner);
    if (!ownerExists) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    const existingMembers = await User.find({ _id: { $in: members } });
    if (existingMembers.length !== members.length) {
      return res.status(404).json({ error: 'Some members not found' });
    }

    const ownerFriends = await User.findById(owner).select('friends').lean();
    const ownerFriendIds = ownerFriends.friends.map((friend) => friend.toString());

    members.forEach((memberId) => {
      if (!ownerFriendIds.includes(memberId.toString())) {
        return res
          .status(400)
          .json({ error: `Owner is not friends with member ${memberId}` });
      }
    });

    const group = new Group({
      name,
      owner,
      members,
    });

    await group.save();

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: group,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateGroup = async (req, res) => {
  const owner = req.user.id;
  const { groupId } = req.params;
  const { name, description } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.owner.toString() !== owner) {
      return res.status(403).json({ error: 'Only the group owner can update the group' });
    }

    group.name = name || group.name;
    group.description = description || group.description;

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Group updated successfully',
      data: group,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const deleteGroup = async (req, res) => {
  const owner = req.user.id;
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.owner.toString() !== owner) {
      return res.status(403).json({ error: 'Only the group owner can delete the group' });
    }

    await Group.deleteOne({ _id: groupId });

    res.status(200).json({
      success: true,
      message: 'Group deleted successfully',
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getGroups = async (req, res) => {
  const { id } = req.user;
  try {
    const groups = await Group.find({
      $or: [{ owner: id }, { members: id }],
    })
      .populate('members')
      .populate('owner');

    if (!groups) {
      return res.status(404).json({ error: 'No groups found' });
    }

    res.status(200).json({
      success: true,
      data: groups,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId }).populate('members');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const addMember = async (req, res) => {
  const owner = req.user.id;
  const { groupId } = req.params;
  const { members } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.owner.toString() !== owner) {
      return res.status(403).json({ error: 'Only the group owner can add members' });
    }

    const existingMembers = await User.find({ _id: { $in: members } });
    if (existingMembers.length !== members.length) {
      return res.status(404).json({ error: 'Some members not found' });
    }

    if (members.includes(owner)) {
      return res.status(400).json({ error: 'Owner cannot be added as a member' });
    }

    if (members.some((memberId) => group.members.includes(memberId))) {
      return res.status(400).json({ error: 'Some members are already in the group' });
    }

    const ownerFriends = await User.findById(owner).select('friends').lean();
    const ownerFriendIds = ownerFriends.friends.map((friend) => friend.toString());

    members.forEach((memberId) => {
      if (!ownerFriendIds.includes(memberId.toString())) {
        return res
          .status(400)
          .json({ error: `Owner is not friends with member ${memberId}` });
      }
    });

    group.members.push(...members);

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Members added successfully',
      data: group,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const removeMember = async (req, res) => {
  const owner = req.user.id;
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.owner.toString() !== owner) {
      return res.status(403).json({ error: 'Only the group owner can remove members' });
    }

    if (group.owner.toString() === userId) {
      return res.status(400).json({ error: 'Owner cannot be removed from the group' });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: 'Member not found in the group' });
    }

    group.members = group.members.filter((memberId) => memberId.toString() !== userId);

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      data: group,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const leaveGroup = async (req, res) => {
  const { id } = req.user;
  const { groupId } = req.params;

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.owner.toString() === id) {
      if (group.members.length === 0) {
        await Group.deleteOne({ _id: groupId });

        return res.status(200).json({
          success: true,
          message: 'Group deleted successfully',
        });
      }
      const randomIndex = Math.floor(Math.random() * group.members.length);
      const newOwner = group.members[randomIndex];

      group.owner = newOwner;

      group.members = group.members.filter(
        (memberId) => memberId.toString() !== newOwner.toString()
      );

      await group.save();

      return res.status(200).json({
        success: true,
        message: 'Owner left the group successfully',
        data: group,
      });
    }

    if (!group.members.includes(id)) {
      return res.status(400).json({ error: 'User not found in the group' });
    }

    group.members = group.members.filter((memberId) => memberId.toString() !== id);

    await group.save();

    res.status(200).json({
      success: true,
      message: 'User left the group successfully',
      data: group,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
