const express = require('express');
const router = express.Router();

const courseController = require("../controllers/courses.controller");
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo") ; 
// router.get("/api/courses", courseController.getAllCourses);

// router.get("/api/courses/:courseId", courseController.getCourse);
// router.post("/api/courses", courseController.addCourse);

// router.patch("/api/courses/:courseId", courseController.updateCourse);

// router.delete("/api/courses/:courseId", courseController.deleteCourse);

router
  .route("/")
  .get(courseController.getAllCourses)
    .post( verifyToken, courseController.addCourse);
router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(
    verifyToken,
    allowedTo("admin", "manager"),
    courseController.deleteCourse
  );
module.exports = router;
