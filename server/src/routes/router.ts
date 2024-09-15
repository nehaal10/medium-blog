import Router from "express"
import {signup, login, refreshAccessToken} from '../controller/user_controller'
import cookieParser from "cookie-parser"
import {authorizeMiddleware} from '../middleware/auth_middleware'
const router = Router()

router.post("/sineup", signup)
router.post("/login",login)
router.post("/refreshtoken", authorizeMiddleware, cookieParser(), refreshAccessToken)
export default router

