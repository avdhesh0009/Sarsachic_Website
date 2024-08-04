// models/ShippingAddress.js
import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  flat: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  pin: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true }
}, { timestamps: true });

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
export default ShippingAddress;
