import mongoose from "mongoose";

const DiscountSchema = mongoose.Schema({
    code:{ 
        type: String, 
        require: true, 
        unique: true 
    },
    isPercent:{ 
        type: Boolean, 
        require: true, 
        default: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    expireDate: { 
        type: String, 
        require: true, 
        default: '' 
    },
    isActive: { 
        type: Boolean, 
        require: true,
        default: true 
    }
});
DiscountSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});
export const Discounts = mongoose.model('DiscountCodes',DiscountSchema);