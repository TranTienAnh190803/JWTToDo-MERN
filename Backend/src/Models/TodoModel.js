import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    work: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["In progress", "Done", "Overdue"],
        required: true
    },
    addedDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Todo = mongoose.model("Todo", todoSchema)