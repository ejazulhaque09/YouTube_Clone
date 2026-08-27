import { Response } from 'express';
import User from '../Models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/express';

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { channelName, email, about, password, profilePic } = req.body;
        const isExist = await User.findOne({ email });
        // checks if the user already exists
        if (isExist) {
            res.status(400).json({ success: false, msg: 'User Already Exists' });
            return;
        }
        // hash the password for security
        const hashedPass = await bcrypt.hash(password, 10);
        // creates a new user in the database
        const user = new User({ channelName, email, about, password: hashedPass, profilePic });
        await user.save();
        res.status(201).json({ success: true, msg: 'User registered successfully', data: user });
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // verify the password and generate a jwt token if valid
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id }, secretKey);
            res.cookie('token', token);
            res.json({ success: true, msg: 'LoggedIn Successfully', token, user });
        } else {
            res.json({ success: false, msg: 'Invalid Credentials' });
        }
    } catch (err) {
        res.json({ success: false, msg: (err as Error).message });
    }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    // clear the token cookie
    res.clearCookie('token').json({ success: true, msg: 'Logged Out Successfully' });
};
