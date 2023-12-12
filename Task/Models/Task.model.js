import mongoose, {Schema} from "mongoose";

const task = Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    priority: {
        type:String,
        enum: ['Low','Medium','High'],
        default:'Medium'
    },
    dueDate: {
        type:Date,
        required:true
    },
    completed: {
        type: Boolean,
        enum: [true,false],
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{
    timestamps:true
})

export default mongoose.model('tasks', task);