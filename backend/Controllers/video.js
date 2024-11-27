const Video = require('../Models/video')
const user = require('../Models/user')

exports.uploadVideo = async (req, res) => {
    try{
        const {title, description, videoLink, category, thumbnail} = req.body;
        // creates a new video with logged in users id
        const video = new Video({user: req.user._id, title, description, videoLink, category, thumbnail})
        await video.save();
        res.status(201).json({
            success: true,
            video
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

        // fetch all the videos 
        const videos = await Video.find().populate('user', 'channelName profilePic userName createdAt about')
        res.status(200).json({
            success: true,
            videos
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

// retrieve all videos by a specific user
exports.getAllVideoByUserId = async (req, res) => {
    try{
        let {userId} = req.params;
        //fetch videos uploaded by the specific user
        const video = await Video.find({user: userId}).populate('user', 'channelName profilePic userName createdAt about')

        //fetch user details without the password
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
exports.editVideo = async (req, res) =>{
    const {id} = req.params;
    const {title, description, videoLink, category, thumbnail} = req.body;

    console.log(id)
    try{
        const video = await Video.findById(id);
        if(!video) {
            return res.status(404).json({error: "Video not found"})
        }
        // checking if the loggedin user is the owner of the video
        if(video.user.toString() !== req.user._id.toString()){
            return res.status(403).json({error: "Unauthorized"})
        }

        // updating the video details
        video.title = title || video.title;
        video.description = description || video.description;
        video.videoLink = videoLink || video.videoLink;
        video.category = category || video.category;
        video.thumbnail = thumbnail || video.thumbnail;

        await video.save();
        res.status(200).json({success: true, video})
    }
    catch(err){
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.deleteVideo = async(req, res) =>{
    try{
        const {id} = req.params
        const video = await Video.findById(id);
        if(!video){
            return res.status(404).json({error: "Video not found"})

        }
        // checking authorization so that only owner of the video can delete it
        if(video.user.toString() !== req.user._id.toString()){
            return res.status(403).json({error: "Unauthorized"})
        }
        await Video.deleteOne({_id: id});
        res.status(200).json({msg: "Video deleted"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }   
}