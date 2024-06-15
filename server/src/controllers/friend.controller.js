import User from 'src/models/user.model';
import handleErrors from 'src/utils/error.util';

export const getFriends = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate('friends');
    const { friends } = user;
    res.json({
      success: true,
      data: friends,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const sendFriendRequest = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { selectedUserId } = req.params;

  try {
    const selectedUser = await User.findById(selectedUserId);
    const currentUser = await User.findById(currentUserId);

    if (!selectedUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (
      selectedUser.incomingFriendRequests.includes(currentUserId) ||
      currentUser.outgoingFriendRequests.includes(selectedUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Friend request already sent',
      });
    }

    await User.findByIdAndUpdate(selectedUserId, {
      $push: { incomingFriendRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { outgoingFriendRequests: selectedUserId },
    });

    res.status(200).json({
      success: true,
      message: 'Friend request sent successfully',
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getIncomingFriendRequests = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id)
      .populate('incomingFriendRequests', 'userName avatar fullName')
      .lean();

    const { incomingFriendRequests } = user;

    res.status(200).json({
      success: true,
      data: incomingFriendRequests,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id)
      .populate('outgoingFriendRequests', 'userName avatar fullName')
      .lean();

    const { outgoingFriendRequests } = user;

    res.status(200).json({
      success: true,
      data: outgoingFriendRequests,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { selectedUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!currentUser || !selectedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (
      !currentUser.incomingFriendRequests.includes(selectedUserId) ||
      !selectedUser.outgoingFriendRequests.includes(currentUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Friend request not found',
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { incomingFriendRequests: selectedUserId },
      $push: { friends: selectedUserId },
    });

    await User.findByIdAndUpdate(selectedUserId, {
      $pull: { outgoingFriendRequests: currentUserId },
      $push: { friends: currentUserId },
    });

    res.status(200).json({
      success: true,
      message: 'Friend request accepted successfully',
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getNonFriends = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const excludedUserIds = [...currentUser.friends, currentUserId];

    const nonFriends = await User.find({
      _id: { $nin: excludedUserIds },
    });

    res.status(200).json({
      success: true,
      data: nonFriends,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { selectedUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const selectedUser = await User.findById(selectedUserId);

    if (!currentUser || !selectedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!currentUser.friends.includes(selectedUserId)) {
      return res.status(400).json({
        success: false,
        message: 'User is not your friend',
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: selectedUserId },
    });

    await User.findByIdAndUpdate(selectedUserId, {
      $pull: { friends: currentUserId },
    });

    res.status(200).json({
      success: true,
      message: 'Friend removed successfully',
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
