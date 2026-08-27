import express from 'express';
import * as videoController from '../Controllers/video';
import auth from '../Middleware/authMiddleware';
import { isAdmin } from '../Middleware/roleMiddleware';

const router = express.Router();

router.post('/uploadVideo', auth, isAdmin, videoController.uploadVideo);         // upload video - admin only
router.get('/allvideo', auth, videoController.getAllVideo);                       // get all videos
router.get('/getVideoById/:videoId', auth, videoController.getVideoById);        // get video by Id
router.get('/:userId/channel', auth, videoController.getAllVideoByUserId);       // get all videos by UserId
router.put('/video/:id', auth, isAdmin, videoController.editVideo);              // edit video - admin only
router.delete('/video/:id', auth, isAdmin, videoController.deleteVideo);         // delete video - admin only
router.post('/video/:id/like', auth, videoController.likeVideo);                 // like a video
router.post('/video/:id/dislike', auth, videoController.dislikeVideo);           // dislike a video
router.get('/video/:id/reactions', auth, videoController.getVideoReactions);     // get like/dislike counts

export default router;
