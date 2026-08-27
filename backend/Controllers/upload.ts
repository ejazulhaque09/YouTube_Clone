import { Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/express';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'Youtube-Clone' },
            (error, result) => {
                if (error) {
                    res.status(500).json({ error: error.message });
                    return;
                }
                res.status(200).json({ url: result!.secure_url, duration: result!.duration });
            }
        );

        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);

    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};
