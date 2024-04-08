import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    Fname:{
        type: String,
        minLenth:[2,'name too short'],
        maxLenth:[20,'name too long'],
        trim:true,
        required:true
    },
    Lname:{
        type: String,
        minLenth:[2,'name too short'],
        maxLenth:[20,'name too long'],
        trim:true,
        required:true
    },
    profilePic:Object,
    userName:String,
    email:{
        type: String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minLenth:[5,'password too short'],
        required:true
    },
    passwordChangedAt:Date,
    loggedOutAt:Date,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    phoneNumber:String,
    governorate:String,
    DOB:Date,
    gender:{
        type:String,
        enum:['male','female',''],
    },
    verified:{
        type:Boolean,
        default:false
    },
    provider:{
        type:String,
        enum:['system','facebook','google'],
        default:'system'
    }
},{timestamps:true},{collection:'users'})




export const userModel=mongoose.model('user',userSchema)