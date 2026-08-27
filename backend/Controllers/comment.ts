import { Response } from 'express';
import Comment from '../Models/comment';
import { AuthRequest } from '../types/express';

// Add comment
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { video, message } = req.body;
        const comment = new Comment({
            user: req.user!._id,  // extracted from authenticated user's token
            video,
            message
        });
        await comment.save();
        res.status(201).json({ success: true, comment });
    } catch (err) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
};

// Retrieve comment using video id
export const getCommentByVideoId = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { videoId } = req.params;  // extract id from request parameters
        const comment = await Comment.find({ video: videoId }).populate(
            'user',
            'channelName profilePic email createdAt about'
        );
        res.status(200).json({ msg: true, comment });
    } catch (err) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
};

export const editComment = async (req: AuthRequest, res: Response): Promise<void> => {
    const { videoId } = req.params;
    const { message } = req.body;
    try {
        const comment = await Comment.findById(videoId).populate(  // populate user details
            'user',
            'channelName profilePic email createdAt about'
        );
        if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        comment.message = message;  // updates the comment message
        await comment.save();
        res.status(200).json({ msg: 'Comment updated', comment });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
    const { videoId } = req.params;
    try {
        const comment = await Comment.findById(videoId).populate(
            'user',
            'channelName profilePic email createdAt about'
        );
        if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        await comment.deleteOne({ _id: videoId });  // delete the comment from database
        res.status(200).json({ msg: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
