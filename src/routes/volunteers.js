const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /volunteers",
  });
});

router.post("/", (req, res, next) => {
  /*
    request body or payload looks like
    {
      "name": "Harsh Shah",
      "email": "harshshah.coder@gmail.com",
      "password": "harsh@123",
      "city": "Ahmedabad",
      "pincode": 380007,
      "phoneNumber": "9601126985"
    }
  */

  const volunteer = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: {
      city: req.body.city,
      pincode: req.body.pincode,
    },
    phoneNumber: req.body.phoneNumber,
  };

  res.status(201).json({
    message: "Handling POST requests to /volunteers",
    volunteerDetails: volunteer,
  });
});

router.get("/:volunteerId", (req, res, next) => {
  const id = req.params.volunteerId;
  res.status(200).json({
    message: "Handling GET requests to /volunteers/{id}",
    id,
  });
});

router.patch("/:volunteerId", (req, res, next) => {
  const id = req.params.volunteerId;
  res.status(200).json({
    message: "Handling PATCH requests to /volunteers/{id} (Update)",
    id,
  });
});

router.delete("/:volunteerId", (req, res, next) => {
  const id = req.params.volunteerId;
  res.status(200).json({
    message: "Handling DELETE requests to /volunteers/{id} (Delete)",
    id,
  });
});

module.exports = router;
