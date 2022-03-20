import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';

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

mongoose.connect(process.env.MONGO_DB_URL, () => {
  console.log('MONGO_DB has been connected!');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Backend server is running!');
});
