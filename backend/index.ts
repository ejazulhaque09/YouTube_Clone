import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import './Config/db';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [process.env.FRONTEND_URL as string, 'http://localhost:5173'],
    credentials: true
}));

// middleware to parse json and cookies
app.use(express.json());
app.use(cookieParser());

import authRoute from './Routes/user';
import videoRoute from './Routes/video';
import commentRoute from './Routes/comment';
import uploadRoute from './Routes/upload';

// routes
app.use('/auth', authRoute);
app.use('/video', videoRoute);
app.use('/comment', commentRoute);
app.use('/upload', uploadRoute);

// Starts the server
app.listen(port, () => {
    console.log('Server Started on port:', port);
});
