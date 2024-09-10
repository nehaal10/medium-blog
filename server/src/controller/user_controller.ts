import {createUserRequest,createUserRequestType, errorHandle, loginRequestPayload, loginRequestType} from '@mediumblog/common'
import { Request, Response } from 'express'
import { addRefreshToeknToUser, createUser, getUser } from '../pkg/user/user_service'
import {compareHash, generateAccessToken, generateRefreshToken, hashPassword} from '../utils/utils'

export async function signup(req: Request , res: Response) {
    // do the scjhema validation 
   const out = createUserRequest.safeParse(req.body)
   if(!out.success) {
        res.status(500).json({
        message: "Request fialed, please enter valid details"
    })
    return
   }

   const name: string = out.data.name
   const emailID: string = out.data.emailid
   const password: string =  (await hashPassword(out.data.password)).toString()

   // write util function for trimming down spaces

   const createUserType: createUserRequestType = {
    name: name,
    emailid: emailID,
    password: password,
   }

  let user = await createUser(createUserType)
  if (user == null) {
    res.status(200).json({
      message: "user created"
    })
    return
  }

  res.status(403).json({
    message: "failed"
  })
}

export async function login(req : Request, res: Response) {
  const validate = loginRequestPayload.safeParse(req.body)
  if (!validate.success) {
    res.status(400).json({
      message: "user not validated"
    })
    return
  }

 const {emailid, passwrod} = validate.data
 let loginPayload: loginRequestType = {
  emailid: emailid,
  passwrod: passwrod
 }

 let user = await getUser(loginPayload)

 if(user instanceof errorHandle) {
  res.status(401).json({
    mesage: "user doesnt exist plase try login in"
  })
  return
 }

const isPasswordMatch = compareHash(loginPayload.passwrod,user.password)
if (!isPasswordMatch) {
  res.status(401).json({
    mesage: "Invalid Details"
  })
  return 
}

// set jwt token
const accessToken = generateAccessToken(user.id)
const refreshToken = generateRefreshToken(user.id)

if (refreshToken == null) {
  res.status(401).json({
    message:"error createom refresh token"
  })
  return
}

if(accessToken == null) {
  res.status(401).json({
    message: "Login Failed"
  })
  return
}
 
let err = await addRefreshToeknToUser(refreshToken, user.id)
if (err != null) {
  res.status(401).json({
    message:"error createom refresh token"
  })
  return 
}

  res.status(200).json({
    token: accessToken
  })
}

