import {createUserRequest, createUserRequestType} from '@mediumblog/common'
import { Request, Response } from 'express'
import { createUser } from '../pkg/user/user_service'

export async function signup(req: Request , res: Response) {
    // do the scjhema validation 
   const out = createUserRequest.safeParse(req.body)
   if(!out.success) {
        res.status(500).json({
        message: "Request fialed, please enter valid details"
    })
   }

   const {name, emailID, passwrod} = req.body

   const createUserType: createUserRequestType = {
    name: name,
    emailid: emailID,
    password: passwrod
   }

   await createUser(createUserType)
   
    // if passed then call the src/pkg/user/user_service.ts file create user 
    // create thw jwt token
    // then set the header with jwt token.
}