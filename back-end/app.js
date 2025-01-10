const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const session = require('express-session');
const createError=require("http-errors")
const adminRoute=require("./routes/adminRoute")
const clientRoute=require("./routes/clientRoute")
const freelancerRoute=require("./routes/freelancerRoute")

const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.use(cors({
    origin:["http://localhost:5173"],
    methods: ['GET', 'POST',"PUT","DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true 
}))
app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,             
      saveUninitialized: true,   
      cookie: {
        maxAge: 1000 * 60,  
      },
    })
  );

app.use("/admin",adminRoute)
app.use("/client",clientRoute)
app.use("/freelancer",freelancerRoute)

app.all("*",(req,res,next)=>{
  next(createError(404, 'Page not found'));
})

app.use((err, req, res, next) => {

  // console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports=app;