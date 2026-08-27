import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/user';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/express';

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

interface JwtPayload {
    userId: string;
}

// middleware to authenticate user using JWT
const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token;

    // checks if token exists
    if (!token) {
        res.status(401).json({ success: false, msg: 'No token found' });
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        // retrieves user details from database excluding password
        const foundUser = await User.findById(decoded.userId).select('-password');
        if (!foundUser) {
            res.status(401).json({ success: false, msg: 'User not found' });
            return;
        }
        req.user = foundUser;
        next();
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

export default auth;
