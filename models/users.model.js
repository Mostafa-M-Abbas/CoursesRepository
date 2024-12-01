const mongoose = require("mongoose"); 
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        validate: [validator.isAlpha, "First name must contain only alphabetical characters"]
    }, 
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        validate: [validator.isAlpha, "Last name must contain only alphabetical characters"]
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: [validator.isEmail, "Please enter a valid email"]
    }, 
    password: {
        type: String, 
        reuired: true, 
    }, 
    token:{
        type: String,
    }, 
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin" , "manager"],
    }, 
    avatar: {
        type: String,
        default:"uploads/profile.jpg",
    }
})

module.exports = mongoose.model("User", userSchema);