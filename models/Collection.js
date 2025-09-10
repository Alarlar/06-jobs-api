const { required } = require("joi");
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    painting: {
      type: String,
      required: [true, "Please provide picture name"],
      maxlength: 50,
    },
    generes: {
      type: String,
      required: [true, "Please provide generes name"],
      maxlength: 100,
    },
    available: {
      type: String,
      enum: ["onsite", "loaned", "borrowed"],
      default: "onsite",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", JobSchema);
