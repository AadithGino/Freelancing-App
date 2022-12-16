const express = require("express");
const router = express.Router();

const userSingup = require("../../Controller/User/signupController");
const userLogin = require("../../Controller/User/loginController");
const userprofile = require("../../Controller/User/profileController");
const usernote = require("../../Controller/User/notesController");
const { protect } = require("../../middleware/jwtauth");
//  Singup Route
router.post("/signup", userSingup.SignUpPost);

// Login Route
router.post("/login", userLogin.loginPost);

//Profile
router.route("/profile").get(protect, userprofile.profileGet);

//HOME
router.route("/").get(protect, userLogin.HOMEGET); 

//add project
router.route("/add-project").post(protect, usernote.addNotesPost);

//get project
router.route("/my-project").get(protect, usernote.getNotesPost);

//delete project
router.route("/delete-project").get(protect, usernote.deletenote);

//add photo
router.route("/profile-photo").post(protect, userLogin.addPhoto);


router.route("/add-project").post(protect, usernote.addNotesPost);

//view single project 
router.route("/view-single-project").get(protect,usernote.singleprojectview)

module.exports = router;
