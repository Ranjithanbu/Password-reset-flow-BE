import Express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./database/config.js";
import Mainrouter from "./routers/router.js";


dotenv.config()

const app=Express()

app.use(cors())

app.use(Express.json())

//calling connectDB function

connectDB()

//testing route

app.get('/',(req,res)=>{
    res.status(200).json({message:'site is working'})
})
//routing to router file

app.use('/api',Mainrouter)
const port=process.env.PORT

//listening the port 

app.listen(port,()=>{
    console.log("app is listening on the port",port);
})  