// Type
// Name
// Email/UserName (index)
// Password
// Phone Number
// Address
// pin code
// Area (City)

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const donorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  addressLine1: { type: String },

  addressLine2: { type: String },

  city: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
});

mongoose.set("strictQuery", true);

module.exports = mongoose.model("Donor", donorSchema);
