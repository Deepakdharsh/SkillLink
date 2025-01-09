const dotenv=require("dotenv")
dotenv.config({path:"./.env"})
const mongoose=require("mongoose")
const app=require("./app")

mongoose.connect(process.env.DATABASE)
.then((res)=>{console.log("Mongodb successfully connected")})
.catch((err)=>console.log(err.message))

const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`App is running on port:${PORT}`)
})