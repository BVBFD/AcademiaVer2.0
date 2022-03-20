import express from 'express';
import 'express-async-errors';
import Conversation from '../models/Conversation.js';

const router = express.Router();

// create new conversation
router.post('/', async (req, res, next) => {
  try {
    const newConv = await new Conversation({
      members: [req.body.userId, req.body.receiverId],
    });
    const savedConv = await newConv.save();
    res.status(201).json(savedConv);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// get conv of user
router.get('/:patnerId', async (req, res, next) => {
  try {
    const foundConv = await Conversation.findOne({
      members: { $in: [req.params.patnerId] },
    });
    res.status(200).json(foundConv);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// delete a conv
router.delete('/:convId', async (req, res, next) => {
  try {
    await Conversation.findByIdAndDelete(req.params.convId);
    res.status(204).json('Conversation has been deleted!');
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

export default router;
