import { errorHandle, loginRequestType, updateUserInfoType } from '@mediumblog/common'
import { CreateUser, GetUserByEmailID, addResfreshTokenTouser } from './dal/dal'
import {type User, userResPayload} from './model/model'
import { type createUserRequestType } from '@mediumblog/common'

export let createUser = async (createUseReq: createUserRequestType): Promise<Error| null> => {
    // call get function db
    var {error} = await GetUserByEmailID(createUseReq.emailid)
    if (error == null) {
        let error = new Error("create user Failed")
        const err = new errorHandle({
            name: "EGetUserFailed",
            message: "user Already exist create failed",
            errors: error,
            stack: error.stack
        })
        console.log(err)

        return err
    }

    const user : User = {
        id:  crypto.randomUUID(),
        name: createUseReq.name,
        email_id: createUseReq.emailid,
        password: createUseReq.password,
        is_active: true,
        is_deleted: false,
        create_by: createUseReq.emailid,
        created_on: new Date(),
        updated_by: createUseReq.emailid,
        updated_on: new Date(),
    }

    var {error} = await CreateUser(user)

   if(error) {
    
    const err = new errorHandle({
        name: "ECreateUserFailed",
        message: "creating user failed",
        errors: error,
        stack: error.stack
    })
    return err
   }

    return null
}

export let getUser = async (userLoginReqPayload: loginRequestType): Promise<userResPayload | errorHandle> => {
    let {data, error} = await GetUserByEmailID(userLoginReqPayload.emailid)
    if (error != null) {
        return new errorHandle({
            name: "EGetUserFailed",
            message: error.message,
            errors: error,
            stack: error.stack
        })
    }

    return data
}

export let addRefreshToeknToUser = async(refreshTok: string, id: string): Promise<errorHandle| null> => {
    const {error} = await addResfreshTokenTouser(refreshTok, id)
    if (error != null) {
        return new errorHandle({
            name: "EUpdateUserFailed",
            message: error.message,
            errors: error,
            stack: error.stack
        })
    }

    return null
}