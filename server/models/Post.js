import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      max: 50,
      default: '',
    },

    img: {
      type: String,
      default: '',
    },

    likes: {
      type: Array,
      default: [],
    },

    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Posts', postSchema);
