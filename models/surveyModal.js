const mongoose = require("mongoose");
const subSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    responses: [
      {
        type: String,
        enum: ["No", "Yes, a bit", "Yes, a lot"],
        default: "No",
        required: true,
      },
    ],
  },
  {
    _id: false,
  }
);

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  survey: {
    type: [subSchema],
    required: true,
  },
});

const survey = mongoose.model("surveys", surveySchema);
module.exports = survey;
