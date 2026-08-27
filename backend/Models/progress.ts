import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
    user: mongoose.Types.ObjectId;
    video: mongoose.Types.ObjectId;
    completed: boolean;
    lastWatchedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const progressSchema = new Schema<IProgress>({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    video: { type: Schema.Types.ObjectId, ref: 'video', required: true },
    completed: { type: Boolean, default: false },
    lastWatchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IProgress>('progress', progressSchema);
