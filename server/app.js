import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';
import postsRouter from './routes/postsRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

app.get('/api/test', (req, res, next) => {
  res.status(200).json('Hello this is first DB Server Test!');
});

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

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
