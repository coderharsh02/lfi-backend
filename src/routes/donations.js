const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Donation = require("../models/donation");
const Donor = require("../models/donor");

router.get("/", (req, res, next) => {
  Donation.find()
    .populate("donor")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        donations: docs.map((doc) => {
          return {
            ...doc._doc,
            request: {
              type: "GET",
              url: `${process.env.HOST_URL}/donations/${doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {

  Donor.findById(req.body.donor)
    .then((donor) => {
      if (!donor) {
        return res.status(404).json({
          message: "Donor not found!",
        });
      }

      const donation = new Donation({
        _id: mongoose.Types.ObjectId(),
        donor: req.body.donor,
        noOfMeals: req.body.noOfMeals,
        pickUpTimeFrom: req.body.pickUpTimeFrom,
        pickUpTimeTill: req.body.pickUpTimeTill,
        status: "available",
      });
      return donation.save();
    })
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Donation Stored",
        donationDetails: {
          ...result._doc,
        },
        request: {
          type: "GET",
          url: `${process.env.HOST_URL}/donations/${result._id}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:donationId", (req, res, next) => {
  const id = req.params.donationId;

  Donation.findById(id)
    .exec()
    .then((doc) => {
      // doc can be null if no such object exists
      // console.log(doc);

      if (doc) {
        res.status(200).json({
          ...doc._doc,
          request: {
            type: "GET",
            url: `${process.env.HOST_URL}/donations/`,
          },
        });
      } else {
        res.status(404).json({
          message: "No such donation exists",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:donationId", (req, res, next) => {
  const id = req.params.donationId;

  Donation.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Donation removed successfully",
        id,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
