const express = require("express");
const router = express.Router();

const Survey = require("../models/surveyModal");
const SurveyReport = require("../models/surveyReport");
//add survey

router.post("/addsurvey", async (req, res) => {
  try {
    const data = req.body.data;

    if (!data) {
      res.status(400).send({
        success: false,
        message: "invalid Parameters",
      });
    }

    const newsurvey = new Survey(data);

    await newsurvey.save();
    res.status(200).send({
      success: true,
      message: "Survey Added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

router.post("/getsurvey", async (req, res) => {
  try {
    const surveyname = req.body.name;
    if (!surveyname) {
      res.status(400).send({
        success: false,
        message: "Missing parameters",
      });
    }

    const data = await Survey.find({ name: surveyname });
    if (!data) {
      res.status(400).send({
        success: false,
        message: "Invalid Name",
      });
    }

    res.send({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

//ADD Report

router.post("/addreport", async (req, res) => {
  console.log(req.body);
  try {
    // if (!req.body.email || !req.body.score) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Missing parameters",
    //   });
    // }

    const newReport = new SurveyReport(req.body);
    await newReport.save();

    return res.status(200).send({
      success: true,
      message: "report added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
    console.log(`Error Found: ${error}`);
  }
});

module.exports = router;
