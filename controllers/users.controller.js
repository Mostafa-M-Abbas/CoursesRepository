const express = require("express");
const userModel = require("../models/users.model");
const httpStatus = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = async (req, res) => {
  const query = req.query;
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit;
  try {
    const users = await userModel
      .find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    res.json({ status: httpStatus.SUCCESS, data: { users } });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ status: httpStatus.ERROR, data: { error: e.message } });
  }
  // res.json(users);
};

const register = async (req, res) => {
  const { firstName, lastName, email, password , role } = req.body;
  const oldUser = await userModel.findOne({ email: email });
  if (oldUser) {
    return res
      .status(400)
      .json({
        status: httpStatus.ERROR,
        data: { message: "Email already exists" },
      });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role, 
    avatar:req.file.filename
  });
  const token = await generateJWT({ email: newUser.email, id: newUser._id ,role: newUser.role });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: httpStatus.SUCCESS, data: { user: newUser } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email, password: password });
  if (!user) {
    return res
      .status(400)
      .json({ status: httpStatus.ERROR, data: { message: "User not found" } });
  }
  const matchedPassword = bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateJWT({ email: user.email, id: user._id ,role:user.role });
    
    return res.json({ status: httpStatus.SUCCESS, data: { token } });
  } else {
    return res
      .status(400)
      .json({
        status: httpStatus.ERROR,
        data: { message: "Invalid Credentials" },
      });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
