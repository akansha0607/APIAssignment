const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
        min: [18, "User must be at least 18 years old"],
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
              const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
              return emailRegex.test(email);
            },
            message: "Invalid Email Address",
          },
    },
    Gender: {
        type: String,
        required: true
    },
    Mobile: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
              const regex = /^\d{10}$/;
              return regex.test(value);
            },
            message: "Please provide a 10-digit mobile number",
          },
    },
    Birthday: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
              const regex = /^\d{2}-\d{2}-\d{4}$/;
              return regex.test(value);
            },
            message: "Please provide a birthday date in the dd-mm-yyyy format",
          },
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('workoutModel', workoutSchema)

