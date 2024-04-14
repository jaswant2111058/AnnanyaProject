const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  recipient_email: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "doctors",
    required: true,
  },
  time: {
    type: Date,
    // required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
});

const Appointment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appointment;
