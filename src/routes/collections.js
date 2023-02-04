const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /collections",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST requests to /collections",
  });
});

router.get("/:collectionId", (req, res, next) => {
  const id = req.params.collectionId;
  res.status(200).json({
    message: "Handling GET requests to /collections/{id}",
    id,
  });
});

router.delete("/:collectionId", (req, res, next) => {
  const id = req.params.collectionId;
  res.status(200).json({
    message: "Handling DELETE requests to /collections/{id} (Delete)",
    id,
  });
});

module.exports = router;