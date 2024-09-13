import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Profile from '../models/profile.model.js';

// Save or update profile details
export const saveProfile = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, mnumber, birthdate, gender } = req.body;
  
    if (!firstName || !lastName || !email || !mnumber || !birthdate || !gender) {
      throw new ApiError(400, "All fields are required");
    }
  
    try {
      // Assuming you're using Mongoose or a similar ORM
      const profile = await Profile.findOneAndUpdate(
        { email }, // Assuming email is unique and used to identify the profile
        { firstName, lastName, mnumber, birthdate, gender },
        { new: true, upsert: true }
      );
  
      res.status(200).json(new ApiResponse(200, "Profile updated successfully", profile));
    } catch (error) {
      throw new ApiError(500, "Server error, unable to save profile");
    }
  });
  

export const getProfile = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        throw new ApiError(400, "Email is required.");
    }

    const profile = await Profile.findOne({ email });
    if (profile) {
        res.status(200).json(new ApiResponse(200, profile, "Profile found successfully"));
    } else {
        throw new ApiError(404, "Profile not found");
    }
});
