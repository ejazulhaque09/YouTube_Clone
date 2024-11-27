const express = require('express')
const router = express.Router();
const videoController = require('../Controllers/video')

const auth = require('../Middleware/authMiddleware')

router.post('/uploadVideo',auth,videoController.uploadVideo)
router.get('/allvideo',videoController.getAllVideo)
router.get('/getVideoById/:videoId',videoController.getVideoById)
router.get('/:userId/channel',videoController.getAllVideoByUserId)

module.exports = router