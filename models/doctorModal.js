const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    qualification: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      default: "doctor",
    },
    status: {
      type: String,
      default: "active",
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const doctor = mongoose.model("doctors", doctorSchema);
module.exports = doctor;
