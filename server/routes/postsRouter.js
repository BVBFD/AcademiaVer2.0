import express from 'express';
import 'express-async-errors';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

// create a post
router.post('/', async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// update a post
router.put('/:postId', async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId);
    if (foundPost.userId === req.body.userId) {
      await foundPost.updateOne({ $set: req.body });
      res.status(200).json('Post has been updated!');
    } else {
      res.status(403).json('You can update only your own posts!');
    }
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// delete a post
router.delete('/:postId', async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId);
    if (foundPost.userId === req.body.userId) {
      await foundPost.deleteOne();
      res.status(204).json('Post has been deleted!');
    } else {
      res.status(403).json('You can update only your own posts!');
    }
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// get a post
router.get('/:postId', async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId);
    res.status(200).json(foundPost);
  } catch (error) {
    res.status(404).json('Not Found!');
  }
});

// get all posts
router.get('/', async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// get user's all posts
router.get('/profile/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const usersPost = await Post.find({ userId: user._id });
    res.status(200).json(usersPost);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

export default router;
