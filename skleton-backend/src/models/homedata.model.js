import mongoose, {Schema} from "mongoose";


const homeSchema = new Schema(
    {
        mainColor: {
            type: String,
            required: true,
            lowercase: true,
            trim: true, 
        },
        secondaryColor: {
            type: String,
            required: true,
            lowercase: true,
            trim: true, 
        },
        homeBannerImage: {
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


export const Home = mongoose.model("Home", homeSchema)