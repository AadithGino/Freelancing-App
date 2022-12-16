var express = require('express');
var router = express.Router();

const adminlogin = require('../../Controller/Admin/logincontroller')
const admin = require("../../Controller/Admin/admincontroller")
const signup = require("../../Controller/Admin/signupController")
const { protect } = require('../../middleware/jwtauth');
const adminProject = require('../../Controller/Admin/adminproject');

//signup 

router.post("/signup",signup.SignUpPost)

//login 
router.post("/login",adminlogin.adminloginpost)

//home
router.route("/").get(protect,adminlogin.adminHome)

// freelnacer home 

router.route("/projects").get(protect,adminProject.freelancerHome)

//user status change 
router.route("/block").get(protect,adminlogin.adminBlock)

//search 
router.post("/search",admin.searchUser)

//delete user 
router.route("/delete").get(protect,admin.deleteUser)

//apply for project 
router.route("/project-apply").post(protect,adminProject.freelancerApply)




module.exports = router;
