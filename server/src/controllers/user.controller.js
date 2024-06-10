import Conversation from 'src/models/conversation.model';
import User from 'src/models/user.model';

const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUser } }).select('-password');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastMessagesWithOtherUsers = async (req, res) => {
  try {
    const { userId } = req.body;

    const conversations = await Conversation.find({
      participants: userId,
      deletedBy: { $ne: userId },
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .populate('participants', '_id fullName profilePicture');

    const lastMessages = conversations.map((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId.toString()
      );
      return {
        _id: otherParticipant._id,
        fullName: otherParticipant.fullName,
        profilePicture: otherParticipant.profilePicture,
        lastMessage: conversation.messages.length > 0 ? conversation.messages[0] : null,
      };
    });

    res.status(200).json(lastMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { freindRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getByIdFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate('freindRequests', 'userName profilePicture fullName')
      .lean();

    const { freindRequests } = user;

    res.json(freindRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const sendAcceptFriendRequest = async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.freindRequests = recepient.freindRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString()
    );

    await sender.save();
    await recepient.save();

    await Conversation.updateMany(
      {
        $or: [{ userIds: [senderId, recepientId] }, { userIds: [recepientId, senderId] }],
      },
      {
        $pull: { deletedBy: { $in: [senderId, recepientId] } },
      }
    );

    res.status(200).json({ message: 'Friend Request accepted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getByIdAcceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      'friends',
      'userName profilePicture fullName'
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNonFriends = async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;
    const loggedInUser = await User.findById(loggedInUserId).populate('friends', '_id');
    const friendIds = loggedInUser.friends.map((friend) => friend._id.toString());

    const nonFriends = await User.find({
      _id: { $ne: loggedInUserId, $nin: friendIds },
    }).select('-password');

    res.status(200).json(nonFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId.toString());
    friend.friends = friend.friends.filter((id) => id.toString() !== userId.toString());

    await Conversation.updateMany(
      { participants: { $all: [userId, friendId] } },
      { $addToSet: { deletedBy: userId } }
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {
  getUsers,
  getLastMessagesWithOtherUsers,
  getUserById,
  sendFriendRequest,
  getByIdFriendRequest,
  sendAcceptFriendRequest,
  getByIdAcceptFriendRequest,
  getNonFriends,
  removeFriend,
};
