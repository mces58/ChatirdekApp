import User from 'src/models/user.model';
import handleErrors from 'src/utils/error.util';

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const users = await User.find({ _id: { $ne: loggedInUser } });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
