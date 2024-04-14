const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },

    grade: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const surveySchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  score: {
    required: true,
    type: Number,
  },
  survey: {
    type: [subSchema],
  },
});

const Reports = mongoose.model("surveyreports", surveySchema);

module.exports = Reports;
