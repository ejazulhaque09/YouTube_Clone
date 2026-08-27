import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoLink: string;
    thumbnail: string;
    category: string;
    likes: mongoose.Types.ObjectId[];
    dislikes: mongoose.Types.ObjectId[];
    time: string;
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideo>({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoLink: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, default: 'All' },
    likes: { type: [Schema.Types.ObjectId], ref: 'user', default: [] },
    dislikes: { type: [Schema.Types.ObjectId], ref: 'user', default: [] },
    time: { type: String, required: true, default: '02.25' }
}, { timestamps: true });

export default mongoose.model<IVideo>('video', videoSchema);
