const bcrypt=require("bcrypt")
const UserModel=require("../models/userModel")
const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer');
const createError=require("http-errors")

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.sendOtp=(req,res,next)=>{

    try {
        const {email}=req.body;
        console.log(email)

        if(!email) throw createError(503,"something went wrong")

        const otp = Math.floor(1000 + Math.random() * 9000); 
        req.session.otp=otp;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ddharshpr@gmail.com', 
              pass: 'aytumbzpqmzshddv',   
            },
        });
    
        const mailOptions = {
        from: 'skillLink@gmail.com',     
        to: `${email}`,
        subject: 'Hello from Node.js!',   
        // text: 'hello', 
        html: `<h1>Your otp:${otp}</h1><p>Sent using <b>Nodemailer</b>!</p>`,
      };
      
      // Step 3: Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
      });
    
      res.status(201).json({
        status:"success",
      })
    } catch (error) {
        next(error)
    }
}

exports.signUp=async(req,res,next)=>{
    try {
        const sessionOtp=req.session.otp;
        const {username,email,password,otp}=req.body
        console.log( typeof req.body.otp)
        console.log(typeof sessionOtp)
        
        if(Number(otp)!==sessionOtp) throw createError(400,"Invaild otp")

        if(!username||!email||!password) throw createError(400,"req.body is empty")
            
        const user = await UserModel.findOne({email})

        if(user) throw createError(503,"User already exists")

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
        next(error)
    }   
}

exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        // console.log(req.body)
        if(!email||!password){
            throw  createError(400,"please provide email and password")
        }

        const user = await UserModel.findOne({email}).select("+password")
        console.log(user)
        // const match = await bcrypt.compare(password,user.password)

        if(!user||!(await user.correctPassword(password,user.password))){
         throw  createError(401,"incorrect email or password")
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
        next(error)
    }
}

exports.googleSignIn=async(req,res,next)=>{
    try {
        const {email,given_name:name,sub:googleID,picture:photo}=req.body
        console.log(req.body)
        if(!email||!name||!googleID){
            throw createError(400,"please provide email and password")
        }

        const user = await UserModel.findOne({email}).select("+password")
        console.log(user)

        if(!user){
            const newUser = await UserModel.create({
                name,
                email,
                photo,
                googleID,
            })

            
         const token = signToken(newUser._id)

         return res.status(201).json({
            status:"success",
            token,
            result:{
                user
            }
        })
        }

        if(googleID===user.googleID){
            const token = signToken(user._id)

            return res.status(201).json({
            status:"success",
            token,
            result:{
                user
            }
        })
     }
        
        
    } catch (error) {
        next(error)
    }
}

exports.protected=async(req,res,next)=>{
   try {
     let token;
 
     if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
     }
 
     if(!token){
        return createError(401,"your are not logged-In")
     }

     const isVerified=jwt.verify(token,process.env.JWT_SECRET)

     if(!isVerified) return createError(401,"invaild token")
    
     const decoded=jwt.decode(token)

     const currentUser = UserModel.findOne({_id:decoded.id})

     req.user=currentUser
     next()
     
   } catch (error) {
        next(error)
   }
}

exports.restrictedTo=(req,res,next)=>{
    
}