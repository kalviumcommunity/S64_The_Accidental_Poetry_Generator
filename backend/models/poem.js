const mongoose = require("mongoose");

const PoemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Poem text is required"],
      trim: true,
      minlength: [5, "Poem must be at least 5 characters long"],
      maxlength: [1000, "Poem cannot exceed 1000 characters"],
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Poem", PoemSchema);
