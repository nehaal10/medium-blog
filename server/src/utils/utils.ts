import {hash, compare} from 'bcrypt'
import { createSecretKey } from 'crypto'
import jwt from 'jsonwebtoken' 
export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = hash(password, 10)
    return hashedPassword
}

export const compareHash = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isValid = compare(password, hashedPassword)
    if (!isValid) {
        return false
    }
    return true
}

export const generateAccessToken = (userID: string): string| null => {
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY
    if (!secret) {
        return null
    }
    
    const jwtToken = jwt.sign({id: userID}, secret,{
        expiresIn: 30000,
    })

    if (!jwtToken) {
        return null
    }

    return jwtToken
}

export const verifyAccessToken = (token: string): string| null => {
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY
    if (!secret) {
        return null
    }
   const  payload = jwt.verify(token,secret) as jwt.JwtPayload
   if (!payload) {
    return null
   }

   return payload.id
}

export const generateRefreshToken = (userID: string): string| null => {
    const secret = process.env.REFRESH_TOKEN_SECRET_KEY
    if (!secret) {
        return null
    }
    console.log(secret)
    const jwtToken = jwt.sign({id: userID}, secret,  {
        expiresIn: '3d',
    } )

    if (!jwtToken) {
        return null
    }

    return jwtToken
}

export const verifyRefreshToken = (token: string): string| null => {
    const secret = process.env.REFRESH_TOKEN_SECRET_KEY
    if (!secret) {
        return null
    }
    
    const  payload = jwt.verify(token,secret) as jwt.JwtPayload
    if (!payload) {
     return null
    }
 
    return payload.id
 }