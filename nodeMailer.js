import nodemailer from'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

 const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ranjithjithg@gmail.com',
        pass:'lian dmlq ones gzjr'
    }
})

export default transport
