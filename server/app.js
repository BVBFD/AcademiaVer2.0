import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';
import postsRouter from './routes/postsRouter.js';
import conversationsRouter from './routes/conversationsRouter.js';
import messagesRouter from './routes/messagesRouter.js';
import { Server } from 'socket.io';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use(cors());

const io = new Server(8900, {
  cors: {
    origin: '*',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  // when connect
  console.log('A user connected!');

  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send and get message
  socket.on('sendMessage', ({ receiverId, data }) => {
    // const user = getUser(receiverId);
    // console.log(user);
    console.log(receiverId);
    io.emit('getMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

app.get('/api/test', (req, res, next) => {
  res.status(200).json('Hello this is first DB Server Test!');
});

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/convs', conversationsRouter);
app.use('/api/messages', messagesRouter);

app.use((req, res, next, error) => {
  res.status(404).json('Not Found!');
});

app.use((req, res, next, error) => {
  console.log(error);
  res.status(500).json(error);
});

mongoose.connect(process.env.MONGO_DB_URL, () => {
  console.log('MONGO_DB has been connected!');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Backend server is running!');
});
