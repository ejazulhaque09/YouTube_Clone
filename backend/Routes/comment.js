const express = require('express')
const router = express.Router();
const auth = require('../Middleware/authMiddleware')
const commentController = require('../Controllers/comment')

router.post('/Addcomment', auth, commentController.addComment)
router.get('/comment/:videoId',commentController.addComment)

module.exports = router;