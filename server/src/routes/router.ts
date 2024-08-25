import Router from "express"
import {signup} from '../controller/user_controller'
const router = Router()

router.post("/sineup", signup)
router.post("/login")
router.get("/googlelogin")

export default router

