import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/utils";


export const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const acessToken = req.headers.authorization?.split(" ")[1]
        if (acessToken == null) {
            throw new Error("cannont")
        }
        const userId = verifyAccessToken(acessToken)
        if (userId == null) {
            throw new Error("cannot authenticate usr") 
        }

        req.body.userID = userId
        next()

    } catch(error) {
        res.status(500).json({
            message: "Failed"
        })
    }
}