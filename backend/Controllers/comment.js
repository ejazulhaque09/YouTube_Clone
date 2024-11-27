const Comment = require('../Models/comment')

exports.addComment = async (req, res) => {
    try{

        let {video, message} = req.body;
        const comment = new Comment({
            user: req.user._id,
            video,
            message
        })
        await comment.save();
        res.status(201).json({
            success: true,
            comment
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getCommentByVideoId = async (req, res) => {
    try{
        let {videoId} = req.params;
        const comment = await Comment.find({video: videoId}).populate('user', 'channelName profilePic userName createdAt about')
        res.status(200).json({
            msg: true,
            comment
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}