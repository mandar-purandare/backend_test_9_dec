import UserModel from "../Models/User.model.js";

export const CreateUser = async (req,res) => {
    try{
        const {adminId, userName, email, type} = req.body;

        if(!userName || !email || !adminId) return res.status(401).json({success:false, message:'Username, Email and Admin ID are mandatory'});

        const isAdmin = await UserModel.findById(adminId);
        if(!isAdmin) return res.status(401).json({success:false, message:'Invalid admin id'});

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
    try{ 
        const {userId, adminId} = req.query;

        if(!userId || !adminId) return res.status(401).json({success:false, message:'User ID and Admin ID are mandatory'});

        // return res.json({userId, adminId});
        const isAdmin = await UserModel.findById(adminId);
        if(!isAdmin) return res.status(401).json({success:false, message:'Invalid admin id'});

        await UserModel.findByIdAndDelete(userId);

        return res.status(200).json({success:true, message:'User deleted successfully'});
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export const ReadUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}


export const ReadOwnData = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id) return res.status(401).json({success:false, message:'User ID is not provided'});

        const user = await UserModel.findById(id);
        if(!user) return res.status(401).json({success:false, message:'User not found'});

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}