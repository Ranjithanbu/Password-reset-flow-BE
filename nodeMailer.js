import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
//creating nodemailer transport

export const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.mailId,
        pass:process.env.email_password
}
}) 
