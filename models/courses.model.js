const mongoose = require("mongoose");

// Define the course schema and model
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  // { timestamp: true }   => created-at , updated-at
);

// Create the Course model from the schema
const Course = mongoose.model("Course", courseSchema);

// Export the Course model
module.exports = Course;
