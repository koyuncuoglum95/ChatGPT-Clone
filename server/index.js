import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import openAIRoutes from './routes/OpenAI.js';
import authRoutes from './routes/Auth.js';
import userRoutes from './routes/User.js';


const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/OpenAIDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(openAIRoutes);
app.use(authRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
