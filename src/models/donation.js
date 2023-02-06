const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },

    noOfMeals: {
      type: Number,
      required: true,
    },

    pickUpTimeFrom: {
      type: String,
      required: true,
    },

    pickUpTimeTill: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["available", "pickedUp"],
    },
  },
  { timestamps: true }
);

mongoose.set("strictQuery", true);

module.exports = mongoose.model("Donation", donationSchema);
