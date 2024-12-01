const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer")
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("FILE", file);
        cb(null, 'uploads/'); 
    } ,
    filename: function (req, file, cb) {
        const extract = file.mimetype.split('/')[1]; // remove extension from filename if it exists
        const fileName = `user-${Date.now()}.${extract}`; 
        cb(null, fileName);
    }
})
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0]; 
    if (imageType === 'image') {
        return cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
}
const upload = multer({ storage, fileFilter });

// router.route('/').get( verifyToken , userController.getAllUsers);
router.get("/", userController.getAllUsers, verifyToken);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
