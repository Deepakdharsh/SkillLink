const express=require("express")
const authController=require("../controllers/authController")

const Router=express.Router()

Router.route("/sign-up").post(authController.signUp)
Router.route("/sign-in").post(authController.login)

module.exports=Router