const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /donations",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST requests to /donations",
  });
});

router.get("/:donationId", (req, res, next) => {
  const id = req.params.donationId;
  res.status(200).json({
    message: "Handling GET requests to /donations/{id}",
    id,
  });
});

router.delete("/:donationId", (req, res, next) => {
  const id = req.params.donationId;
  res.status(200).json({
    message: "Handling DELETE requests to /donations/{id} (Delete)",
    id,
  });
});

module.exports = router;