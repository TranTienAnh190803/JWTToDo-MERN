import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    work: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["In progress", "Done"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Todo = mongoose.model("Todo", todoSchema)