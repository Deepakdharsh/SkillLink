const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const validator=require("validator")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"A user must have name"],
        unique:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true,"A user must have email"],
        lowercase:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    photo:String,
    role:{
        type:String,
        enum:["client","freelancer","admin"],
        default:"client"
    },
    password:{
        type:String,
        trim:true,
        // required:[true,"A user must have password"],
        min:[8,"A password must have aleast 8 charcters"],
        select:false
    },
    googleID:String,
    Skills:{
        type:[String]
    },
    isBlocked:Boolean,
    position:String,
    degree:[String],
    bio:String
},{timestamps:true})

UserSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()
   
  this.password=await bcrypt.hash(this.password,12)
//   console.log("=====================")
//   console.log(this.password)
//   console.log("=====================")

  next()

})

UserSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    const val = await bcrypt.compare(candidatePassword,userPassword)
    console.log(val)
    return val
}

const UserModel=mongoose.model("user",UserSchema)

module.exports = UserModel