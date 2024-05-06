import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minLenth: [5, "password too short"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    provider: {
      type: String,
      enum: ["system", "facebook", "google"],
      default: "system",
    },
    accountID: String,
  },{ timestamps: true },{ collection: "admins" }
);

adminSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password , 8);
})

export const adminModel=mongoose.model('admin',adminSchema)