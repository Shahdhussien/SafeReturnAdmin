import mongoose from "mongoose";

const foundChildschema=mongoose.Schema({
    image:Object,
    name:{
        type:String,
        minLenth:[3,'name too short'],
        maxLenth:[50,'name too long'],
        trim:true,
        required:true
    },
    nationalID:{
        type:Number,
        trim:true,
        required:true
    },
    parentphone:{
        type:Number,
    },
    parentName:{
        type:String,
    },
    orphanageName:{
        type:String,
        trim:true
    },
    updated:{
        type:Boolean,
        default:false
    }
},{timestamps:true},{collection:'found Children'})

export const foundChildmodel=mongoose.model('found Child',foundChildschema)