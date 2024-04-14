require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const dbconfig = require("./config/dbconfig");
const port = process.env.port || 3000;
const userRoutes = require("./routes/userRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const AppointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
const db = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(userRoutes);
app.use(surveyRoutes);
// app.use(AppointmentRoutes);
const startServer = async () => {
  mongoose.connect(
    "mongodb+srv://nasa-api:6ybvrxwT4vmnuCkV@cluster0.pdd585k.mongodb.net/happy2help2",
    {}
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

app.get("/check", (req, res) => {
  res.send({
    status: "success",
    message: "Server is running successfully",
  });
});

app.post("/check-post", async (req, res) => {
  console.log(req.body);
  console.log("hi");
  res.send(req.body);
});

startServer();
