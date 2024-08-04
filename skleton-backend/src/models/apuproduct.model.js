import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    sizes: {
      type: [String],
      required: true
    },
    colors: {
      type: [String],
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    featuredProduct: {
      type: Boolean,
      default: false
    },
    oversizedTshirt: {
      type: Boolean,
      default: false
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

const ApuProduct = mongoose.model('Apu-Product', productSchema);

export default ApuProduct;
