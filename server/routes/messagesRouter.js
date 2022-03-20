import express from 'express';
import 'express-async-errors';
import Message from '../models/Message.js';

const router = express.Router();

// add a message
router.post('/', async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

// get messages
router.get('/:convId', async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.convId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json('Bad Request!');
  }
});

export default router;
