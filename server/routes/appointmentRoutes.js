const express = require("express");
const router = express.Router();

const Appoint = require("../models/appointmentModal");

//Add Appointment
router.post("/addAppointment", async (req, res) => {
  try {
    if (!req.body.recipient_email || !req.body.doctor || !req.body.approved)
      return res.status(400).send({
        status: false,
        message: "Invalid Parameters",
      });

    const newAppoint = new Appoint(req.body);

    await newAppoint.save();

    res.send({
      status: true,
      message: "Appointment add successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

//get Appointment By User Email
router.post("./getAppByemail", async (req, res) => {
  try {
    if (!req.body.email)
      return res.status(400).send({
        status: false,
        message: "Invalid Parameters",
      });
    const data = await Appoint.find({ email: req.body.email, approved: true });

    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

//Approve Appointment and Add time
router.post("/approveAppointments", async (req, res) => {
  try {
    if (!req.body.Appid)
      return res.status(400).send({
        status: false,
        message: "Invalid Parameters",
      });

    const data = await Appoint.findOneAndUpdate(
      { id: req.body.Appid },
      { approved: true, time: req.body.date }
    );
    res.send({
      status: true,
      message: "Appointment Updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = Appoint;
