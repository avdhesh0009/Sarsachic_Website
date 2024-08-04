import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  mobileNumber:{
    type:String,
    required:true,
    trim:true
  },
  flat:{
    type:String,
    required:true,
    trim:true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city:{
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
},{timestamps:true});

export const Address = mongoose.model('Address', addressSchema);

