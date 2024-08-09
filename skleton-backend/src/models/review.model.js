import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    imageUrl:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        trim:true,
        required:true
    },
    rating:{
        type:Number,
        trime:true,
        required:true
    },
    quote:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})

export const Reviews = mongoose.model("Reviews",reviewSchema);
