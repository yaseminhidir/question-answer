const User=require("../models/User");
const { CustomError } = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const blockUser=asyncErrorWrapper(async (req, res, next) => {
    const user=req.data;
    user.blocked=!user.blocked;
    console.log(user);
    await user.save();
    return res.status(200).json({
        success:true,
        message:"Block - Unblock successfull"
    })

}); 

const deleteUser=asyncErrorWrapper(async (req, res, next) => {
   const user=req.data;
await user.remove();
   return res.status(200).json({
       success:true,
       message: "Delete operation successfull"
   })
});

module.exports={blockUser, deleteUser}