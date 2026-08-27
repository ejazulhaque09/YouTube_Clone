import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    channelName: string;
    email: string;
    password: string;
    about: string;
    profilePic?: string;
    role: 'employee' | 'admin';
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    channelName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String, required: true },
    profilePic: { type: String },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee'
    },
    department: { type: String, default: 'General' }
}, { timestamps: true });

export default mongoose.model<IUser>('user', userSchema);
