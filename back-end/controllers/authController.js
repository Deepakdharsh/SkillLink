const bcrypt=require("bcrypt")
const UserModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.signUp=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        console.log(req.body)
        if(!username||!email||!password){
            new Error("req.body is empty")
        }
        const user = await UserModel.findOne({email})

        if(user) new Error("User already exists")

        const newUser = await UserModel.create({
            name:username,
            email,
            password
        }) 

        const token=signToken(newUser._id)

        res.status(201).json({
            status:"success",
            token,
            result:{
                newUser
            }
        })
        
        
    } catch (error) {
            res.status(500).json({
            status:"failed",
            message:error.message
        })
    }   
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(req.body)
        if(!email||!password){
            return new Error("please provide email and password")
        }

        const user =await UserModel.findOne({email}).select("+password")
        console.log(user)
        // const match = await bcrypt.compare(password,user.password)

        if(!user||!(await user.correctPassword(password,user.password))){
         return new Error("incorrect email or password")
        }
        
        const token = signToken(user._id)

        res.status(201).json({
            status:"success",
            token,
            result:{
                user
            }
        })

    } catch (error) {
            res.status(500).json({
            status:"failed",
            error:error.message
            })
    }
}

exports.googleSignIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(req.body)
        if(!email||!password){
            return new Error("please provide email and password")
        }

        const user =await UserModel.findOne({email}).select("+password")
        console.log(user)
        // const match = await bcrypt.compare(password,user.password)

        if(!user||!(await user.correctPassword(password,user.password))){
         return new Error("incorrect email or password")
        }
        
        const token = signToken(user._id)

        res.status(201).json({
            status:"success",
            token,
            result:{
                user
            }
        })

    } catch (error) {
            res.status(500).json({
            status:"failed",
            error:error.message
            })
    }
}

exports.protected=async(req,res,next)=>{
   try {
     let token;
 
     if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
     }
 
     if(!token){
        return new Error("your are not logged-In")
     }

     const isVerified=jwt.verify(token,process.env.JWT_SECRET)

     if(!isVerified) return new Error("invaild token")
    
     const decoded=jwt.decode(token)

     const currentUser = UserModel.findOne({_id:decoded.id})

     req.user=currentUser
     next()
     
   } catch (error) {
        res.status(500).json({
        status:"failed",
        message:error.message
        })
   }
}

exports.restrictedTo=(req,res,next)=>{
    
}