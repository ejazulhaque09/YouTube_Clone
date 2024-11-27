const Video = require('../Models/video')
const user = require('../Models/user')

exports.uploadVideo = async (req, res) => {
    try{
        const {title, description, videoLink, category, thumbnail} = req.body;
        const video = new Video({user: req.user._id, title, description, videoLink, category, thumbnail})
        await video.save();
        res.status(201).json({
            success: true,
            data: video
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getAllVideo = async (req, res) => {
    try{
        const videos = await Video.find().populate('user', 'channelName profilePic userName createdAt about')
        res.status(200).json({
            success: true,
            data: videos
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getAllVideoByUserId = async (req, res) => {
    try{
        let {userId} = req.params;
        const video = await Video.find({user: userId}).populate('user', 'channelName profilePic userName createdAt about')
        const loggedInUser = await user.findById(userId).select('-password');
        res.status(200).json({
            success: true,
            data: video,
            user : loggedInUser
        })
        
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getVideoById = async (req, res) => {
    try{
        let {videoId} = req.params;
        const video = await Video.findById(videoId).populate('user', 'channelName profilePic userName createdAt about')
        res.status(200).json({
            success: true,
            data: video
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}