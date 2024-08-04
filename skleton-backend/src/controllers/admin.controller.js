import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const manageUsers = asyncHandler(async (req,res) => {
    const users = await User.find( { verified:true } ,'email');
    if(!users){
        throw new ApiError(400,"Users are not Found in the databases")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                users
            },
            "User Data Fetch Successfully"
        )
    )
})

const deleteSingleUser = asyncHandler(async (req,res) => {
    const {userId} = req.body;

    const deletedUser = await User.deleteOne({_id:userId});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {deletedUser},
            "User Deleted Successfully"
        )
    )
})
export {
    manageUsers,
    deleteSingleUser
}