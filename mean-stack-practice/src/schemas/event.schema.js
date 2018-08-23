import mongoose from "mongoose";
import uuid from "uuid";

const Event = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        eventId: { type: String, default: uuid.v1 },
        eventName: {
            type: String,
            required: true
        },
        orginationName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        startDate: Date,
    },
    {
        timestamps: true
    }
);
export default Event;