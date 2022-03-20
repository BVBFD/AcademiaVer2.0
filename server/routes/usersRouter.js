import express from 'express';
import 'express-async-errors';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// signup user data
router.post('/signup', async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...user } = savedUser._doc;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login user data
router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    !foundUser && res.status(404).json('Not Found!');

    const validatePwd = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    !validatePwd && res.status(401).json('Invalid Password!');

    const { password, ...user } = foundUser._doc;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
