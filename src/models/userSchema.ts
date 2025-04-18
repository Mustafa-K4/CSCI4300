import mongoose, { Schema, Document, Model } from 'mongoose';

interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const eventSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Item: Model<User> = mongoose.models.Event || mongoose.model<User>('User', eventSchema);
export default Item;