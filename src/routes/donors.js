const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Donor = require("../models/donor");

router.get("/", (req, res, next) => {
  Donor.find()
    // .select('_id name email type address phoneNumber') // password is not the thing that we share
    .exec()
    .then((docs) => {
      res.status(200).json({
        handles: "GET requests to /donors",
        count: docs.length,
        donors: docs.map((doc) => {
          return {
            ...doc._doc,
            request: {
              type: "GET",
              url: `${process.env.HOST_URL}/donors/${doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(200).json({
        handles: "GET requests to /donors",
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  /*
    request body or payload looks like
    {
      "name": "Harsh Shah",
      "email": "harshshah.coder@gmail.com",
      "password": "harsh@123",
      "type": "Individual",
      "addressLine1": "A/301, Vijay Complex",
      "addressLine2": "Nr. Vasna Bus Stand",
      "city": "Ahmedabad",
      "pincode": 380007,
      "phoneNumber": "9601126985"
    }
  */

  const donor = new Donor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    pincode: req.body.pincode,
    phoneNumber: req.body.phoneNumber,
  });

  donor
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        handles: "POST requests to /donors",
        message: "Donor created successfully!",
        donorDetails: {
          ...result._doc,
          request: {
            type: "GET",
            url: `${process.env.HOST_URL}/donors/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        handles: "POST requests to /donors",
        error: err,
      });
    });
});

router.get("/:donorId", (req, res, next) => {
  const id = req.params.donorId;

  Donor.findById(id)
    .exec()
    .then((doc) => {
      // doc can be null if no such object exists
      console.log(doc);

      if (doc) {
        res.status(200).json({
          handles: "GET requests to /donors/{id}",
          id,
          donorDetails: doc,
        });
      } else {
        res.status(404).json({
          handles: "GET requests to /donors/{id}",
          donorDetails: "No such donor exists",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        handles: "GET requests to /donors/{id}",
        error: err,
      });
    });
});

/*
request body 

[
  {
    "propName": "phoneNumber",
    "value": "9601126946"
  },
  {
    "propName": "address",
    "value": {
      "addLine1": "A/301, Vijay Complex updated",
      "addLine2": "Nr. Vasna Bus Stand",
      "city": "Ahmedabad",
      "pincode": "380007"
    }
  }
]
*/
router.patch("/:donorId", (req, res, next) => {
  const id = req.params.donorId;

  console.log(req.body);
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Donor.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: `Donor ${id} Updated Successfully`,
        request: {
          type: "GET",
          url: `${process.env.HOST_URL}/donors/${id}`,
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

router.delete("/:donorId", (req, res, next) => {
  const id = req.params.donorId;

  Donor.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        handles: "DELETE requests to /donors/{id} (Delete)",
        message: "donor removed successfully",
        id,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        handles: "DELETE requests to /donors/{id} (Delete)",
        error,
      });
    });
});

module.exports = router;
