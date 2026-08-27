import { Response } from 'express';
import Video from '../Models/video';
import User from '../Models/user';
import { AuthRequest } from '../types/express';
import { Types } from 'mongoose';

export const uploadVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, description, videoLink, category, thumbnail, time } = req.body;
        // creates a new video with logged in user's id
        const video = new Video({ user: req.user!._id, title, description, videoLink, category, thumbnail, time });
        await video.save();
        res.status(201).json({ success: true, video });
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

export const getAllVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // fetch all the videos
        const videos = await Video.find().populate('user', 'channelName profilePic email createdAt about');
        res.status(200).json({ success: true, videos });
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

// retrieve all videos by a specific user
export const getAllVideoByUserId = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        // fetch videos uploaded by the specific user
        const video = await Video.find({ user: userId }).populate('user', 'channelName profilePic email createdAt about');
        // fetch user details without the password
        const loggedInUser = await User.findById(userId).select('-password');
        res.status(200).json({ success: true, data: video, user: loggedInUser });
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

export const getVideoById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { videoId } = req.params;
        const video = await Video.findById(videoId).populate('user', 'channelName profilePic email createdAt about');
        res.status(200).json({ success: true, data: video });
    } catch (err) {
        res.status(500).json({ success: false, msg: (err as Error).message });
    }
};

export const editVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, videoLink, category, thumbnail, time } = req.body;
    try {
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).json({ error: 'Video not found' });
            return;
        }
        // checking if the logged in user is the owner of the video
        if (video.user.toString() !== (req.user!._id as Types.ObjectId).toString()) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }
        // updating the video details
        video.title = title || video.title;
        video.description = description || video.description;
        video.videoLink = videoLink || video.videoLink;
        video.category = category || video.category;
        video.thumbnail = thumbnail || video.thumbnail;
        video.time = time || video.time;
        await video.save();
        res.status(200).json({ success: true, video });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).json({ error: 'Video not found' });
            return;
        }
        // checking authorization so that only owner of the video can delete it
        if (video.user.toString() !== (req.user!._id as Types.ObjectId).toString()) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }
        await Video.deleteOne({ _id: id });
        res.status(200).json({ msg: 'Video deleted' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// controller for like feature
export const likeVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).json({ success: false, msg: 'Video not found' });
            return;
        }
        const userId = req.user!._id as Types.ObjectId;
        // If the user has already liked the video, remove the like (toggle)
        if (video.likes.some(likeId => likeId.toString() === userId.toString())) {
            video.likes = video.likes.filter(likeId => likeId.toString() !== userId.toString());
        } else {
            video.likes.push(userId);
            // remove the user from dislike if they previously disliked
            video.dislikes = video.dislikes.filter(disId => disId.toString() !== userId.toString());
        }
        await video.save();
        res.status(200).json({ success: true, msg: 'Like updated successfully', likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// controller for dislike feature
export const dislikeVideo = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).json({ success: false, msg: 'Video not found' });
            return;
        }
        const userId = req.user!._id as Types.ObjectId;
        // If the user has already disliked the video, remove the dislike (toggle)
        if (video.dislikes.some(disId => disId.toString() === userId.toString())) {
            video.dislikes = video.dislikes.filter(disId => disId.toString() !== userId.toString());
        } else {
            video.dislikes.push(userId);
            // remove the user from like if they previously liked
            video.likes = video.likes.filter(likeId => likeId.toString() !== userId.toString());
        }
        await video.save();
        res.status(200).json({ success: true, msg: 'Dislike updated successfully', likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const getVideoReactions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) {
            res.status(404).json({ err: 'Video not found' });
            return;
        }
        res.status(200).json({ success: true, likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
};
