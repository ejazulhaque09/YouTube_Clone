import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/express';

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            msg: 'Access Denied: Admins only'
        });
    }
};

export { isAdmin };
