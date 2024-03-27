import Express from "express";
import { loginUser, reigisterUser, resetPassword, resetPasswordLink } from "../controllers/controller.js";

const router = Express.Router()

// checking whether app is working or not

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'app is working' })
})
// router for each controller

router.post('/register', reigisterUser)
router.post('/login', loginUser)
router.post('/resetPasswordLink', resetPasswordLink)
router.put('/resetPassword/:token', resetPassword)
 



export default router