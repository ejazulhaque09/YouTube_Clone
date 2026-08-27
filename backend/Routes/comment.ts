import express from 'express';
import auth from '../Middleware/authMiddleware';
import * as commentController from '../Controllers/comment';

const router = express.Router();

router.post('/Addcomment', auth, commentController.addComment);          // add a new comment & requires authentication
router.get('/comment/:videoId', commentController.getCommentByVideoId);  // retrieve comment by video id
router.put('/comment/:videoId', commentController.editComment);          // edit comment by video id
router.delete('/comment/:videoId', commentController.deleteComment);     // delete comment by video id

export default router;
