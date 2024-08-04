import mongoose, {Schema} from "mongoose";


const themeSchema = new Schema(
    {
        themeName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        
        themeImage: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)


export const Theme = mongoose.model("Theme", themeSchema)