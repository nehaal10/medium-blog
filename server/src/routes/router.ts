import Router from "express"
import {signup, login} from '../controller/user_controller'
const router = Router()

router.post("/sineup", signup)
router.post("/login",login)
router.get("/googlelogin")

export default router

