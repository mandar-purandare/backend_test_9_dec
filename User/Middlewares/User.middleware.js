import UserModel from "../Models/User.model.js"

const isAdmin = async (req, res, next) => {
    try{
        //  if(req.body){
            const {adminId} = req.body;
            
            if(!adminId) return res.status(401).json({success:false, message:'AdminId not provided'});
        //  }else{
        //     const adminId = req.headers.adminid;

        //     if(!adminId) return res.status(401).json({success:false, message:'AdminId not provided'});
        //  }
         
         const user = await UserModel.findOne({_id:adminId});
         if(!user) return res.status(401).json({success:false, message:'Admin not found'});

         if(user.type === 'admin') next();
         
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export default isAdmin