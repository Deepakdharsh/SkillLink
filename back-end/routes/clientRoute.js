const express=require("express")
const authController=require("../controllers/authController")
const multer = require("multer");
const path = require("path");
const Router=express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"public/images")
    },filename:(req,file,cb)=>{
        console.log(file)
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
  
const upload=multer({
  storage:storage
})


Router.route("/otp").post(authController.sendOtp)
Router.route("/forgot-password").post(authController.forgotPassword)
Router.route("/verify-otp").post(authController.verifyForgotOtp)
Router.route("/reset-password").post(authController.resetPassword)
Router.route("/user-type").post(authController.setUserType)
Router.route("/sign-up").post(authController.signUp)
Router.route("/sign-in").post(authController.login)
Router.route("/google-in").post(authController.googleSignIn)
Router.route("/get-user").get(authController.protected,authController.getUser)
Router.route("/list-users").get(authController.protected,authController.listUsers)
Router.route("/upload").post(authController.protected,upload.single("profileImage"),authController.upload)

module.exports=Router