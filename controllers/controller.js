import { register } from "../models/shchemas.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { transporter } from "../nodeMailer.js";
dotenv.config()

//to handle newly registering user & saving to Database

export const reigisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const newUser = new register({ name, email, password: hashedPassword })
        await newUser.save()
        res.status(200).json({ message: "user created successfully", data: newUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//handle the login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const doesExist = await register.findOne({ email })
        if (!doesExist) {
            return res.status(500).json({ message: 'user not found' })
        }
        const matchingPassword = await bcrypt.compare(password, doesExist.password)
        if (!matchingPassword) {
            return res.status(401).json({ message: 'invalid user credential' })
        }





        res.status(200).json({ message: 'log in success' })

    } catch (error) {
        res.status(500).json({ message: 'error while login' })
    }
}

//sending reset pasword link to mail

export const resetPasswordLink = async (req, res) => {

    try {
        const { email } = req.body

        const checkUser = await register.findOne({ email })

        const token = await jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        checkUser.token = token

        await checkUser.save()
        const neededData = `http://localhost:5173/reset-password-page/${checkUser._id}/${token}`
        const mailDetails = {

            from:process.env.mailId,
            to: `${checkUser.email}`,
            subject: 'reset password',
            text: neededData
        }

        if (checkUser) {

            transporter.sendMail(mailDetails, (err) => {
                if (err) { console.log('send mail error') }
                else (console.log('mail sent successfully'))
            })
            res.status(200).json({ message: 'reset password link has been sent your registered mail ', token: neededData })
        }
        else {
            res.status(401).json({ message: 'email not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }

}

//upadating new password 

export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const findDb = await register.findById(decoded._id)
        console.log(findDb)
        if (!findDb || !findDb.token) {
            return res.status(401).json({ message: 'un authorized token ' })
        }

        const { password } = req.body
        const hashpassword = await bcrypt.hash(password, 10)
        const upadateData = await register.findByIdAndUpdate(decoded._id, { password: hashpassword, token: null })
        { msg: 'password updated succesfully' }
        res.status(200).json({ message: 'password updated successfully' })
    } catch (error) {
        res.status(401).json({ message: 'reset password failed' });
    }


}