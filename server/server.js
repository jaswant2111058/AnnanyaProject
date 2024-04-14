// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// // const dbconfig = require("./config/dbconfig");
// const port = process.env.PORT || 5000;
// const userRoutes = require("./routes/userRoutes");
// const surveyRoutes = require("./routes/surveyRoutes");
// const AppointmentRoutes = require("./routes/appointmentRoutes");
// const postroutes = require("./routes/postroutes")
// const app = express();
// const cors = require("cors");
// app.use(cors());
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );
// app.use(express.json());
// app.use(userRoutes);
// app.use(surveyRoutes);
// app.use(postroutes);
// app.use(AppointmentRoutes);
// mongoose.connect(
//   "mongodb+srv://anniagg2003:annanay@cluster0.81ccs6o.mongodb.net/",
//   {}
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });




// app.get("/check", (req, res) => {
//   res.send({
//     status: "success",
//     message: "Server is running successfully",
//   });
// });

// app.post("/check-post", async (req, res) => {
//   console.log(req.body);
//   console.log("hi");
//   res.send(req.body);
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });





require("dotenv").config();
const express = require("express");
 const bodyParser = require("body-parser");
 const morgan = require("morgan");
 const mongoose = require("mongoose");
 // const dbconfig = require("./config/dbconfig");
 const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const AppointmentRoutes = require("./routes/appointmentRoutes");
const postroutes = require("./routes/postroutes")
const app = express();
 const cors = require("cors");
 app.use(cors());
 app.use(
   morgan(":method :url :status :res[content-length] - :response-time ms")
 );
 app.use(express.json());
 app.use(userRoutes);
 app.use(surveyRoutes);
 app.use(postroutes);
 app.use(AppointmentRoutes);
mongoose.connect(
  "mongodb+srv://anniagg2003:annanay@cluster0.81ccs6o.mongodb.net/",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});




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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
