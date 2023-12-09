import mongoose, {Schema} from "mongoose";

const user = Schema({
    adminId: String,
    userName: String,
    email:String,
    type: { 
            type: String, 
            enum: ['user','admin'], 
            default:'user'
        }
})

export default mongoose.model('users',user);