import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },

    profilePic: {
      type: String,
      default: '',
    },

    coverPic: {
      type: String,
      default: '',
    },

    friends: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    desc: {
      type: String,
      max: 50,
    },

    city: {
      type: String,
      max: 50,
    },

    from: {
      type: String,
      max: 50,
    },

    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Users', UserSchema);
