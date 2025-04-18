import mongoose, { Schema, Document, Model } from 'mongoose';

interface Event extends Document {
    name: string;
    date: Date;
    location: string;
    description: string;
    imageUrl: string;
    startTime: string;
    endTime: string;
}

const eventSchema = new Schema<Event>({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const Item: Model<Event> = mongoose.models.Event || mongoose.model<Event>('Event', eventSchema);
export default Item;