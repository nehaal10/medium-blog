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

export type createUserRequestType = zod.infer<typeof createUserRequest>