import mongoose, { Schema } from "mongoose";

const story = new Schema({
  title: {type: String, trim: true, required: true},
  description: {type: String, trim: true, required: true},
  aim: {type: String, trim: true, required: true},
  assets: [{
    assetType: {type: String, trim: true, required: true},
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    assetDescription: {type: String, trim: true, required: true}
  }],
  creationDate: { type: Date, default: Date.now },
});

export default mongoose.model("story", story);