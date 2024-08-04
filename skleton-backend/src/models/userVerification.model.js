import mongoose, {Schema} from "mongoose";

const UserVerificationSchema = new Schema({
    userId:{
      type:String,
      required:true
    },
    uniqueString:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{timestamps:true});

export const UserVerification = mongoose.model("UserVerification",UserVerificationSchema);
