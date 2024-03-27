import mongoose from "mongoose";

//schema for register user

const registerSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:String
})
 


export const register=mongoose.model('register',registerSchema)
