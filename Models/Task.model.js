import mongoose, {Schema} from "mongoose";

const task = Schema({
    title: String,
    description: String,
    priority: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        enum: [true,false],
        default: false
    }
})

export default mongoose.model('tasks', task);