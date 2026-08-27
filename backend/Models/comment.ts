import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: mongoose.Types.ObjectId;
    video: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',    // relationship with the user model
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'video',   // relationship with video model
        required: true
    },
    message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IComment>('comment', commentSchema);
