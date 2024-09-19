import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Address } from "../models/address.model.js";

const saveAddress = asyncHandler(async (req, res) => {
    console.log(req.body); // Add this to see the request payload

    const { name, mobileNumber, flat, street, city, state, postalCode, country } = req.body;
    const { _id: userId } = req.user;

    const userAddress = await Address.create({
        userId, name, mobileNumber, flat, street, city, state, postalCode, country
    });

    if (!userAddress) {
        throw new ApiError(400, "Error while saving the address of user");
    }

    res.status(200).json(new ApiResponse(200, "User Address Saved Successfully"));
});

const getAddresses = asyncHandler(async(req,res)=>{
    const {_id} = req.user;

    const addresses = await Address.find({userId:_id});
    // console.log(addresses);
    if(!addresses){
        throw new ApiError(200,"No addresses are found");
    }
    res.status(200)
    .json(new ApiResponse(200,addresses,"Addresses find successfully"));
})
export {
    saveAddress,
    getAddresses
}