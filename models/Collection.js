const mongoose = require("mongoose");

const MuseumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide museum name"],
      maxlength: 100,
    },
    paintings: [
      {
        name: {
          type: String,
          required: [true, "Please provide painting name"],
          maxlength: 50,
        },
        artist: {
          type: String,
          required: [true, "Please provide artist name"],
          maxlength: 50,
        },
        genres: [
          {
            type: String,
            enum: ["Renaissance", "Impressionism", "Modernism"],
            required: [true, "Please provide generes name"],
          },
        ],
        available: {
          type: String,
          enum: ["onsite", "loaned", "borrowed"],
          default: "onsite",
        },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", MuseumSchema);
