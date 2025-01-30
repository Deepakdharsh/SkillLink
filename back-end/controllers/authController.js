const bcrypt=require("bcrypt")
const UserModel=require("../models/userModel")
const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer');
const createError=require("http-errors")
const multer = require("multer");

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.sendOtp=(req,res,next)=>{
    // console.log('hello from the back-end')
    // console.log(req.body)
    try {
        const {email}=req.body;
        console.log('====================')
        console.log(email)

        if(!email) throw createError(503,"something went wrong")

        const otp = Math.floor(1000 + Math.random() * 9000); 
        req.session.otp=otp;
        req.session.email=email;
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
        success:true,
      })
    } catch (error) {
        next(error)
    }
}

// exports.resetOtp=(req,res,next)=>{
//     console.log('hello from the back-end')
//     console.log(req.body)
//     res.status(200).json({
//         message:"hello from the back-end"
//     })
//     // try {
//     //     // const {email}=req.body;
//     //     const email=req.session.email
//     //     console.log('====================')
//     //     console.log(email)

//     //     if(!email) throw createError(503,"something went wrong")

//     //     const otp = Math.floor(1000 + Math.random() * 9000); 
//     //     req.session.otp=otp;
//     //     const transporter = nodemailer.createTransport({
//     //         service: 'gmail',
//     //         auth: {
//     //           user: 'ddharshpr@gmail.com', 
//     //           pass: 'aytumbzpqmzshddv',   
//     //         },
//     //     });
    
//     //     const mailOptions = {
//     //     from: 'skillLink@gmail.com',     
//     //     to: `${email}`,
//     //     subject: 'Hello from Node.js!',   
//     //     // text: 'hello', 
//     //     html: `<h1>Your otp:${otp}</h1><p>Sent using <b>Nodemailer</b>!</p>`,
//     //   };
      
//     //   // Step 3: Send the email
//     //   transporter.sendMail(mailOptions, (error, info) => {
//     //     if (error) {
//     //       return console.error('Error:', error);
//     //     }
//     //     console.log('Email sent:', info.response);
//     //   });
    
//     //   res.status(201).json({
//     //     success:true,
//     //   })
//     // } catch (error) {
//     //     next(error)
//     // }
// }

// exports.sendOtp=(req,res,next)=>{

//     try {
//         const {email}=req.body;
//         console.log(email)

//         if(!email) throw createError(503,"something went wrong")

//         const otp = Math.floor(1000 + Math.random() * 9000); 
//         req.session.otp=otp;
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'ddharshpr@gmail.com', 
//               pass: 'aytumbzpqmzshddv',   
//             },
//         });
    
//         const mailOptions = {
//         from: 'skillLink@gmail.com',     
//         to: `${email}`,
//         subject: 'Hello from Node.js!',   
//         // text: 'hello', 
//         html: `<h1>Your otp:${otp}</h1><p>Sent using <b>Nodemailer</b>!</p>`,
//       };
      
//       // Step 3: Send the email
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return console.error('Error:', error);
//         }
//         console.log('Email sent:', info.response);
//       });
    
//       res.status(201).json({
//         success:true,
//       })
//     } catch (error) {
//         next(error)
//     }
// }

exports.signUp=async(req,res,next)=>{
    try {
        const sessionOtp=req.session.otp;
        const {username,email,password,otp}=req.body
        // console.log( typeof req.body.otp)
        // console.log(typeof sessionOtp)

        console.log(username,email,password)
        
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

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,// ith production-il true koudakanom,
            sameSite:'strict',
            maxAge:3600000 * 24
        })

       return res.status(201).json({
            success:true,
            token,
            result:{
                newUser
            }
        })
        
        
    } catch (error) {
        next(error)
    }   
}

exports.setUserType=async(req,res,next)=>{
    try {
        const {role,email}=req.body
        console.log( typeof req.body.role)
        console.log( role)
            
        const user = await UserModel.findOneAndUpdate({email},{role},{new:true})

        // if(user) throw createError(503,"User already exists")

        res.status(201).json({
            success:true,
            result:{
                user
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

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,// ith production-il true koudakanom,
            sameSite:'strict',
            maxAge:3600000 * 24
        })

        res.status(201).json({
            success:true,
            token,
            result:{
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

///
exports.logout=async(req,res,next)=>{
    console.log("ssssss")
    try {
        const email=req.email
        // console.log(req.body)
        if(!email){
            throw  createError(400,"email not found")
        }

        const user = await UserModel.findOne({email}).select("+password")
        console.log(user)
        // const match = await bcrypt.compare(password,user.password)

        if(!user){
         throw  createError(401,"user not found")
        }
        
        res.clearCookie("token")

        res.status(201).json({
            success:true,
            message:"logout successfull",
        })

    } catch (error) {
        next(error)
    }
}

exports.block=async(req,res,next)=>{
    console.log("you entered the block controller")
    try {
        const {id}=req.body
        console.log(req.body)

        if(!id){
            throw  createError(400,"userId not found")
        }

        const user = await UserModel.findOne({_id:id})
        console.log(user)

        if(!user){
         throw  createError(401,"user not found")
        }
        // const value
        // user.isBlocked=false
        user.isBlocked=!user.isBlocked
        await user.save()
        
        res.status(201).json({
            success:true,
            message:"successfull blocked user",
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

         res.cookie("token",token,{
            httpOnly:true,
            secure:false,// ith production-il true koudakanom,
            sameSite:'strict',
            maxAge:3600000 * 24
        })

         return res.status(201).json({
            success:true,
            token,
            result:{
                user
            }
        })
        }

        if(googleID===user.googleID){
            const token = signToken(user._id)

            res.cookie("token",token,{
                httpOnly:true,
                secure:false,// ith production-il true koudakanom,
                sameSite:'strict',
                maxAge:3600000 * 24
            })

            return res.status(201).json({
            success:true,
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
    console.log("protected")
   try {
     const token=req.cookies.token
        console.log(token)
     if(!token){
        return createError(401,"your are not logged-In")
     }

     const isVerified=jwt.verify(token,process.env.JWT_SECRET)

     if(!isVerified) return createError(401,"invaild token")
    
     const decoded=jwt.decode(token)

     const currentUser =await UserModel.findOne({_id:decoded.id})
    //  console.log("========")
    //  console.log(currentUser)
    //  console.log("========")
     
     req.email=currentUser.email
     req.role=currentUser.role
     console.log(req.email)
     next()
     
   } catch (error) {
        next(error)
   }
}

exports.isBlocked=async(req,res,next)=>{
    console.log("isBlocked")
   try {
     const email=req.email
     const currentUser=UserModel.findOne({email})

     if(currentUser.role!="admin"){
        if(currentUser?.isBlocked) {
            req.email=""
            next()
        }else{
            next()
        }
     }
        
     next()
     
   } catch (error) {
        next(error)
   }
}


exports.restrictedTo=(...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ message:"Forbidden: Access Denied" });
        }
        next();
    };
}

exports.forgotPassword=async(req,res,next)=>{
try {
    const {email} = req.body;

    console.log(email)
    
    if(!email) throw  createError(500,"req.body is empty")
    
    const user=await UserModel.findOne({email})

    if(!user) throw createError(404,"please provide a vaild email")

    const otp = Math.floor(1000 + Math.random() * 9000); 
    req.session.otp=otp;
    req.session.email=email;
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
        success:true,
    })

} catch (error) {
    next(error)
}
}

exports.verifyForgotOtp=async(req,res,next)=>{
    try {
        const sessionOtp=req.session.otp;
        const {otp}=req.body
        console.log( typeof req.body.otp)
        console.log(typeof sessionOtp)

        console.log(otp)
        if(!otp) throw createError(400,"req.body is empty")
        
        if(Number(otp)!==sessionOtp) throw createError(400,"Invaild otp")


       return res.status(201).json({
            success:true,
        })
        
        
    } catch (error) {
        next(error)
    }  
}

exports.resetPassword=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        console.log(email,password)
    
        if(!email||!password) throw createError(400,"req.body is empty")
        
        const user=await UserModel.findOne({email}).select("+password")
        console.log(user)
        if(!user) throw createError(400,"user not found")
        
        user.password=password
        await user.save({validateBeforeSave:false})
        
        res.status(201).json({
            success:true,
            result:{
                user
            }
        })
        
    } catch (error) {
        next(error)
    }
}

exports.updatePassworde=async(req,res,next)=>{
    try {
        const sessionOtp=req.session.otp;
        const {username,email,password,otp}=req.body
        // console.log( typeof req.body.otp)
        // console.log(typeof sessionOtp)

        console.log(username,email,password)
        
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
            success:true,
            token,
            result:{
                newUser
            }
        })
        
        
    } catch (error) {
        next(error)
    }   
}

// other 

exports.getUser=async(req,res,next)=>{
    try {
        const email=req.email
        console.log(email)
        const user=await UserModel.findOne({email})
        if(!user) throw createError(404,"found no users yet")
        res.status(200).json({
            success:true,
            result:{
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.listUsers=async(req,res,next)=>{
    console.log("request")
    try {
        const users=await UserModel.find()
        console.log(users)
        if(!users) throw createError(404,"found no users yet")
        res.status(200).json({
            success:true,
            result:{
                users
            }
    })
    } catch (error) {
        next(error)
    }
}

exports.updateUser=async(req,res,next)=>{
    const {email,password,name}=req.body
    if(!email||!password||!name) throw createError(400,"invaild creadentials")
    
    const user=await UserModel.findOneAndUpdate({email},{email,password,name},{new:true})

    if(!user) throw createError(404,"Not found")
    
    res.status(200).json({
        success:true,
        result:{
            user
        }
    })
}

exports.deleteUser=async(req,res,next)=>{
    try {
        const id = req.params.id
    
        if(!id) throw createError(400,"invaild creantiails")
        
        const user=UserModel.findById({_id:id})
    
        if(!user) throw createError(404,"user not found yet")
    
        const deletedUser=await UserModel.findByIdAndDelete({_id:id})
    
        res.status(200).json({
            success:true,
            reult:{
                deletedUser
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.getAdmin=async(req,res,next)=>{
    
}

exports.upload=async(req,res,next)=>{
    const userEmail=req.email
    console.log(req.email)
    console.log("===============")
    // console.log(req.body)
    const obj={}
    if(req?.file?.filename) obj.photo=req?.file?.filename
    if(req?.body?.name) obj.name=req?.body?.name
    if(req?.body?.position) obj.position=req?.body?.position
    if(req?.body?.bio) obj.bio=req.body?.bio
    console.log(obj)
    // console.log(req.body)

    // if(Object.keys(obj).length===0) return 

    try {
        const user=await UserModel.findOneAndUpdate({email:userEmail},obj,{new:true})
        // const user=await UserModel.findOne({email:userEmail})
        console.log("=====")
        console.log(user)
        console.log("=====")

        if(!user) throw createError(400,"something went wrong")

        res.status(200).json({ 
        success:true,
        message: 'File uploaded successfully',
        }); 
    } catch (error) {
        console.log(error)
        // next(error)
    }
}

exports.setLocation=async(req,res,next)=>{
    try {
        console.log(req.body)
        const {data}=req.body
        if(!data) throw createError(400,"something went wrong")

        const user=await UserModel.findOneAndUpdate({email:req.email},{location:data})
        res.status(200).json({
            success:true,
            reult:{
                deletedUser
            }
        })
    } catch (error) {
        next(error)
    }
}