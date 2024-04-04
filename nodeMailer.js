import nodemailer from'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

 const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.mailId,
        pass:process.env.email_password
    }
})

export default transport