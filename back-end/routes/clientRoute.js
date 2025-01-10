const express=require("express")
const authController=require("../controllers/authController")

const Router=express.Router()

Router.route("/otp").post(authController.sendOtp)
Router.route("/sign-up").post(authController.signUp)
Router.route("/sign-in").post(authController.login)
Router.route("/google-in").post(authController.googleSignIn)

module.exports=Router