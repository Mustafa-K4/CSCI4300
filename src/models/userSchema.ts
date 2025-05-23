import mongoose, { Schema, Document, Model } from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  events:    { type: String, required: false },
});

export default userSchema;
