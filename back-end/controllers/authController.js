const bcrypt=require("bcrypt")
const UserModel=require("../models/userModel")
const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer');

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.sendOtp=(req,res)=>{

    try {
        const {email}=req.body;
        console.log(email)

        if(!email) throw new Error("something went wrong")

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
        res.status(500).json({
            status:"failed",
            err:error
        })
    }
}

exports.signUp=async(req,res)=>{
    try {
        const sessionOtp=req.session.otp;
        const {username,email,password,otp}=req.body
        console.log( typeof req.body.otp)
        console.log(typeof sessionOtp)
        
        if(Number(otp)!==sessionOtp) throw new Error("Invaild otp")

        if(!username||!email||!password) throw new Error("req.body is empty")
            
        const user = await UserModel.findOne({email})

        if(user) throw new Error("User already exists")

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
        
        
    } catch (err) {
            const error=err
            error.stat
    }   
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body
        // console.log(req.body)
        if(!email||!password){
            throw  new Error("please provide email and password")
        }

        const user = await UserModel.findOne({email}).select("+password")
        console.log(user)
        // const match = await bcrypt.compare(password,user.password)

        if(!user||!(await user.correctPassword(password,user.password))){
         throw  new Error("incorrect email or password")
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
        const {email,given_name:name,sub:googleID,picture:photo}=req.body
        console.log(req.body)
        if(!email||!name||!googleID){
            throw new Error("please provide email and password")
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
            res.status(200).json({
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