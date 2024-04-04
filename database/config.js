import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

//connecting to Database

const mongoconnection=process.env.MONGOCONNECTION;
export const connectDB=async()=>{
    try { 
        const dbconnect=await mongoose.connect(mongoconnection)
        console.log('db onnected successfully');
    } catch (error) {
        console.log(error,'while making database connection');
    }
}
