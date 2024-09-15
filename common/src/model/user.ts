import zod from 'zod'
import {normalStringValidation, passwordValidation} from '../utils/utils'
export const  createUserRequest = zod.object({
    name: zod.string().min(1).max(50).regex(
        normalStringValidation, {
            message: "should not contain any special characters"
        }
    ),
    emailid: zod.string().min(1).email({message: "doesnt match email format"}),
    password: zod.string().min(8).regex(passwordValidation, {message: "Your password is not valid"})
})

export const loginRequestPayload = zod.object({
    emailid: zod.string().min(1).email({message: "doesnt math the format"}),
    password: zod.string().min(8).regex(passwordValidation, {message: "Your password is not valid"})
})

export const updateUserdetails = zod.object({
    id: zod.string().uuid({message: "this is not uuid"}),
    emailID: zod.string().min(1).email({message: "wrong format"}),
    name: zod.string().min(1).max(50).regex(
        normalStringValidation, {
            message: "should not contain any special characters"
        }
    )
})

export type updateUserInfoType = zod.infer<typeof updateUserdetails>
export type createUserRequestType = zod.infer<typeof createUserRequest>
export type loginRequestType = zod.infer<typeof loginRequestPayload>