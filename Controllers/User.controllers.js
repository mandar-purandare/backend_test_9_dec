import UserModel from "../Models/User.model.js";

export const CreateUser = async (req,res) => {
    try{
        const {adminId, userName, email, type} = req.body;
        if(!userName || !email || !adminId) return res.status(401).json({success:false, message:'All fields are mandatory'});

        const user = new UserModel({
            adminId,
            userName,
            email,
            type
        })

        await user.save();

        return res.status(201).json({success:true, message:'User created successfully'});

    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export const DeleteUser = async (req,res) => {

}

export const GetUserInfo = async (req, res) => {

}