import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      index: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      match: [/\S+@\S+\.\S+/, 'Email is not valid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female'],
    },
    avatar: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
      maxlength: [160, 'About section must be less than 160 characters'],
    },
    incomingFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    outgoingFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    hideOnlineStatus: {
      type: Boolean,
      default: false,
    },
    hideAvatar: {
      type: Boolean,
      default: false,
    },
    hideAbout: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

const User = mongoose.model('User', userSchema);

export default User;
