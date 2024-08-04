import mongoose,{Schema} from "mongoose";

const promotionSchema = new Schema({
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Promotion = mongoose.model("Promotion",promotionSchema);