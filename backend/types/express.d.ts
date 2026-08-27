import { Request } from 'express';
import { IUser } from '../Models/user';

// Extend the Express Request interface globally to include the authenticated user
export interface AuthRequest extends Request {
    user?: IUser;
}
