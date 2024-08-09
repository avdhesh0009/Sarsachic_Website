import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {UserVerification} from "../models/userVerification.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Home } from "../models/homedata.model.js";


const saveProfileImage = asyncHandler( async(req,res,next)=>{
    const {userId} = req.params;
    // console.log(userId);
    if (req.file && !req.file.mimetype.startsWith("image")) {
      throw new ApiError(400, "Please provide an image file");
    }

    const profileImageFromCloudinary = req.file
    ? await uploadOnCloudinary(req.file.path)
    : null;

  if (!profileImageFromCloudinary && req.file) {
    throw new ApiError(500, "Error uploading image to cloudinary");
  }
  let profileImage;

  if (profileImageFromCloudinary) {
    profileImage = profileImageFromCloudinary.url;
  }

  const imageData = await User.updateOne({_id:userId},{imageUrl:profileImage,})

  if (!imageData) {
    throw new ApiError(500, "Error saving image data");
  }

  res.status(201).json(new ApiResponse(201, {imageData,profileImage}));
})

const getProfileImage = asyncHandler( async (req,res) =>{
    const {userId} = req.params;

    const {imageUrl} = await User.findOne({_id:userId});

    if(!imageUrl){
        throw new ApiError(500, "Image Url Doesn't Exist");
    }

    res.status(201).json(new ApiResponse(201,imageUrl));
})

const generateAccessToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return accessToken;
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// nodemailer stuff
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})

// testing success
transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success);
    }
})

const sendVerificationEmail = asyncHandler( async ({_id,email},res) => {

   // URL to be used in email
   const currentUrl = "http://localhost:5173/";

   const uniqueString = uuidv4() + _id;

    // Mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p>
               <p>This link <b>expires in 5 minutes</b>.</p>
               <p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`
    };
    
    const hashedUniqueString = await bcrypt.hash(uniqueString,10);

    if(hashedUniqueString){
        const newVerification = await UserVerification.create({
            userId: _id,
            uniqueString: hashedUniqueString,
            expiresAt: Date.now() + 300000, // 5 minutes
        })

        if(newVerification){
            const verificationLinkSent = await transporter.sendMail(mailOptions);

            if(verificationLinkSent){
                return res.status(201).json(
                    new ApiResponse(200,"Verification email sent successfully")
                )
            }
            else{
                throw new ApiError(400,"Verification email failed")
            }
        }
        else{
            throw new ApiError(400,"Couldn't save verification email data!")
        }
    }
    else{
        throw new ApiError(400,"An error occurred while hashing email data!")
    }
})

const verifyUser = asyncHandler(async (req,res) => {
    const {userId,uniqueString} = req.params;

    const userVerification = await UserVerification.findOne({userId});

    if(!userVerification){
        throw new ApiError(400, "Account doesn't exist or has been verified already. Please sign up or log in.");
    }

    const {expiresAt,uniqueString:hashedUniqueString} = userVerification;

    if(expiresAt < Date.now()){
        // Record has expired, so we delete it
        await UserVerification.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
        throw new ApiError(400, "Link has expired. Please sign up again.");
    }

    const isValidString = await bcrypt.compare(uniqueString,hashedUniqueString);

    if (!isValidString) {
        throw new ApiError(400, "Invalid verification details passed. Check your inbox.");
    }

    const updatedUser = await User.updateOne({ _id: userId }, { verified: true });

    if (!updatedUser) {
        throw new ApiError(400, "An error occurred while updating the user record to show verified.");
    }

    await UserVerification.deleteOne({ userId });

    res.status(200).json(new ApiResponse(200,"User Verified Successfully"));
})

const registerUser = asyncHandler( async (req, res) => {
    const {email, username, password } = req.body
    
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    
    const user = await User.create({
        email, 
        password,
        username: username.toLowerCase(),
        verified:false
    })


    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // Handle account verification
    sendVerificationEmail(user,res);
} )

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email,password} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    
    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
       throw new ApiError(401, "Invalid user credentials")
    }

    const accessToken = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
    .status(200)
    .cookie("token", accessToken,{httpOnly:true})
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const forgotPassword = asyncHandler(async (req,res)=>{
    const { email } = req.body;

    const oldUser = await User.findOne({email});

    if(!oldUser){
        throw new ApiError(400,"User Doesn't Exists !!");
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + oldUser.password;

    const token = jwt.sign({
        email:oldUser.email,
        id:oldUser._id
    },
    secret,
    {
        expiresIn:Date.now() + 300000, // 5 minutes
    })

    const link = `http://localhost:5173/user/reset-password/${oldUser._id}/${token}`;

    // Mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p>To reset your password click on link below.</p>
               <p>This link <b>expires in 5 minutes</b>.</p>
               <p>Press <a href=${link}>here</a> to proceed.</p>`
    };
    const resetLink = await transporter.sendMail(mailOptions);

    if(resetLink){
        return res.status(201).json(
            new ApiResponse(200,"Password reset email sent successfully")
        )
    }
    else{
        throw new ApiError(400,"Password reset email sent failed")
    }
})

const resetPasswordGet = asyncHandler(async (req,res) =>{
    const { userId, token } = req.params;

    const oldUser = await User.findOne({ _id: userId });

    if (!oldUser) {
        throw new ApiError(400,"User Not Exists!!" );
    }
    const secret = process.env.ACCESS_TOKEN_SECRET + oldUser.password;

    const verifyLink = jwt.verify(token, secret);

    if(!verifyLink){
        throw new ApiError(400, "token and secret key is not matching");
    }
    const {exp:expiresAt}=verifyLink;

    if(expiresAt < Date.now()){
        throw new ApiError(400, "Link has expired.");
    }

    return res.status(201).json(
        new ApiResponse(200,verifyLink,"Password reset email verified successfully")
    )
})

const resetPasswordPost = asyncHandler(async (req,res) =>{
    const { userId, token } = req.params;
    const { password } = req.body;
    
    const oldUser = await User.findOne({ _id: userId });
    if (!oldUser) {
        throw new ApiError(400,"User Not Exists!!" );
    }
    const secret = process.env.ACCESS_TOKEN_SECRET + oldUser.password;

    const verify = jwt.verify(token, secret);

    if(!verify){
        throw new ApiError(400, "token and secret key is not matching");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.updateOne(
    {
        _id: userId,
    },
    {
        $set: {
        password: encryptedPassword,
        },
    }
    );

    return res.status(201).json(
        new ApiResponse(200,updatedUser,"Password Changed successfully")
    )
})

const googleAuth = asyncHandler(async (req,res) =>{
    const {username,email}=req.body;
    
    const user = await User.findOne({email});

    if(!user){
        const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
            verified:true
        })

        const accessToken = await generateAccessToken(newUser._id);

        const loggedInUser = await User.findById(newUser._id).select("-password");

        return res
        .status(200)
        .cookie("token", accessToken,{httpOnly:true})
        .json(
            new ApiResponse(
                200, 
                {
                    user: loggedInUser, accessToken
                },
                "User logged In Successfully"
            )
        )
    }
    else{
        const accessToken = await generateAccessToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");

        return res
        .status(200)
        .cookie("token", accessToken,{httpOnly:true})
        .json(
            new ApiResponse(
                200, 
                {
                    user: loggedInUser, accessToken
                },
                "User logged In Successfully"
            )
        )
    }
})

const changePassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password");
    }

    user.password=newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Password Change successfully")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    forgotPassword,
    resetPasswordGet,
    resetPasswordPost,
    googleAuth,
    changePassword,
    saveProfileImage,
    getProfileImage
}


