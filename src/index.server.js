const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const env = require("dotenv");
env.config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const donorRoutes = require("./routes/donors");
const donationRoutes = require("./routes/donations");
const volunteerRoutes = require("./routes/volunteers");
const collectionRoutes = require("./routes/collections");

app.use("/donors", donorRoutes);
app.use("/donations", donationRoutes);
app.use("/volunteers", volunteerRoutes);
app.use("/collections", collectionRoutes);

// MongoDB Connection
const connectionString = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@fooddonation.lz3ozyv.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection established!");
  });

// mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
  res.status(200).json({ message: "server started successfully!" });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
