import Express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./database/config.js";
import Mainrouter from "./routers/router.js";


dotenv.config()

const app=Express()
app.use(cors())
app.use(Express.json())
connectDB()

app.use('/api',Mainrouter)
const port=process.env.PORT
app.listen(port,()=>{
    console.log("app is listening on the port",port);
})