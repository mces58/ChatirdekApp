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
    const userId = req.user._id;

    // Kullanıcının son mesajlarını içeren konuşmaları bul
    const conversations = await Conversation.find({ participants: userId })
      .sort({ updatedAt: -1 }) // Son güncellenen konuşmalardan başlayarak sırala
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 }, // Her konuşmadan yalnızca son mesajı getir
      })
      .populate('participants', '_id fullName profilePicture'); // Konuşmanın katılımcılarını getir

    // Konuşmaları filtrele ve her kullanıcı için son mesajı al
    const lastMessages = conversations.map((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId.toString()
      );
      return {
        userId: otherParticipant._id,
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

export { getUsers, getLastMessagesWithOtherUsers };
