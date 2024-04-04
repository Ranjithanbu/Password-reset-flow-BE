import nodemailer from'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

 const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'pauliinivin@gmail.com',
        pass:984212345
    }
})

export default transport
