import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  console.error(
    'MONGO_URI is not defined. Please set it in your environment variables.'
  );
  process.exit(1);
}

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
