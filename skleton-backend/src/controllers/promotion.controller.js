import { Promotion } from "../models/promotion.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const joinUs = asyncHandler(async (req,res)=>{
    const {email} = req.body;

    const user = await Promotion.findOne({email});

    if(user){
        throw new ApiError(400,"User with  this email I'd already exists");
    }
    else{
        const newUser = await Promotion.create({
            email
        })
        if(newUser){
            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        newUser
                    },
                    "Email I'd register successfully"
                )
            )
        }else{
            throw new ApiError("Error while registering the email");
        }
    }
})

export {
    joinUs
};