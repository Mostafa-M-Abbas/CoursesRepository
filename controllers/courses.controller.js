const express = require("express");
// let courses = require("../data/courses");
const courseModel = require("../models/courses.model");
const httpStatus = require('../utils/httpStatusText')
const getAllCourses = async (req, res) => {
  const query = req.query; 
  const limit = req.query.limit; 
  const page = req.query.page;
  const skip = (page - 1) * limit; 

  try {
    const courses = await courseModel.find({} , {"__v":false }).limit(limit).skip(skip);
    res.json({ status: httpStatus.SUCCESS, data: { courses } });
  } catch (e) { 
    console.error(e);
    res.status(400).json({ status: httpStatus.ERROR, data: { error: e.message } });
  }
  // res.json(courses);
};

const getCourse = async(req, res) => {
  // const courseId = +req.params.courseId;

  // let course = courses.find((course) => course.id === courseId);
  // if (!course) {
  //   return res.status(404).json({ msg: "Course not found" });
  // }
  // res.json(course);
  try {
    const course = await courseModel.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, data: { course: null } });
    }
    res.json({ status: httpStatus.SUCCESS, data: { course } });
  } catch (e) { 
    console.error(e);
    res.status(400).json({ status: httpStatus.ERROR, data: { error: e.message } });
  }
};

const addCourse =async (req, res) => {
  // console.log(req.body);
  // courses.push({ id: courses.length + 1, ...req.body });

  // res.status(201).json(courses);

  const newCourse = new courseModel(req.body);
  await newCourse.save()
  res.status(201).json(newCourse);
};

const updateCourse = async(req, res) => {
  // const courseId = +req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  // if (!course) {
  //   return res.status(404).json({ msg: "Course not found" });
  // }
  // course = { ...course, ...req.body };
  const courseId = req.params.courseId; 
  const course = await courseModel.updateOne({ _id: courseId } , {$set: {...req.body}});
  if (!course) {
    return res
      .status(404)
      .json({ status: httpStatus.FAIL, data: { course: "Course not found" } });
  }
  res.json({ status: httpStatus.SUCCESS, data: { course } });

};

const deleteCourse = async(req, res) => {
  const courseId = req.params.courseId;
  const course = await courseModel.deleteOne({ _id: courseId });
  if (!course) {
    return res
      .status(404)
      .json({ status: httpStatus.FAIL, data: { course: "Course not found" } });
  }
  res.json({ status: httpStatus.SUCCESS, data: { course } });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
