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

// update user data
router.put('/:id', async (req, res, next) => {
  if (req.params.id === req.body.userId) {
    // password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const foundUser = await User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        {
          returnOriginal: false,
        }
      );
      const { password, ...user } = foundUser._doc;
      res.status(200).json(user);
    } else {
      try {
        // other datas update other than password
        const foundUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            returnOriginal: false,
          }
        );
        const { password, ...user } = foundUser._doc;
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json('Not found!');
      }
    }
  } else {
    res.status(400).json('Bad Requests!');
  }
});

// delete user data
router.delete('/:id', async (req, res, next) => {
  if (req.params.id === req.body.userId) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).json('Account has been deleted!');
    } catch (error) {
      res.status(404).json('Not Found!');
    }
  } else {
    res.status(400).json('Bad Requests!');
  }
});

// get user data by id
router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json('Not Found!');
  }
});

// get user data by username
router.get('/profile/:username', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      username: req.params.username,
    });
    console.log(foundUser);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json('Not Found!');
  }
});

export default router;
