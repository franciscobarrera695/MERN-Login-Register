import { Router } from "express";
import {register,login,profile} from '../controllers/auth.controllers.js'
import {verifyToken} from '../middlewares/verifyToken.js'
const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/profile',verifyToken,profile)

export default router