const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")
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

/* DATABASE=mongodb://127.0.0.1:27017/skillLink
PORT=8000

JWT_SECRET=my-ultra-secure-and-ultra-long-secret
JWT_EXPIRES_IN=90d
*/
app.use("/admin",adminRoute)
app.use("/client",clientRoute)
app.use("/freelancer",freelancerRoute)

module.exports=app;