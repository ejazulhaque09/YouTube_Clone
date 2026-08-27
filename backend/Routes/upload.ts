import express from 'express';
import multer from 'multer';
import { uploadFile } from '../Controllers/upload';
import auth from '../Middleware/authMiddleware';
import { isAdmin } from '../Middleware/roleMiddleware';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, isAdmin, upload.single('file'), uploadFile);

export default router;
