import {User, userResPayload} from '../model/model'
import { PrismaClient } from '@prisma/client'
import { errorHandle} from '@mediumblog/common'
import e from 'express'

type returnType = {
    data: any,
    error: errorHandle | null
}

const prisma = new PrismaClient(
    {
        datasourceUrl: process.env.DATABASE_URL
    }
)

export let CreateUser = async (userData: User): Promise<returnType> => { 
    // call db
    try {
        let createUser = await prisma.user.create({
            data: userData
        })

        if(!createUser) {
            throw Error("Create Failed")
        }

        return {
            data: createUser,
            error: null
        }

    } catch(error) {
        if (error instanceof Error) {
            const err = new errorHandle({
                name: "ECreateUserFailed",
                message: error.message,
                errors: error,
                stack: error.stack
            })

            return {
                data: null,
                error: err
            }
        }

        return {
            data:  null,
            error: new errorHandle({
                name: "EGetUserFailed",
                message: "unexpected error",
                stack: new Error("something unexpected happend").stack,
                errors: new Error("something unexpected happend") 
            })
        }
    }
}

export let GetUserByEmailID = async(emailId : string): Promise<returnType> => {
    try {
        let dbUser = await prisma.user.findFirst({
            where:{
                email_id: emailId
            }
        })

        if (dbUser == null) {
            let error = new Error("get user failed")
            const err = new errorHandle({
                name: "EGetUserFailed",
                message: error.message,
                errors : error, 
                stack: error.stack
            })

            throw err
        }

        let db: userResPayload = {
            id: dbUser.id,
            email_id: emailId,
            name: dbUser.name,
            password: ""
        }

        return {
            data: db,
            error: null
        }
    } catch(e) {
        if (e instanceof Error) {
            const err = new errorHandle({
                name: "ECreateUserFailed",
                message: "creating new user failed",
                errors: e,
                stack: e.stack
            })

            return {
                data: null,
                error: err
            }
        }

        return {
            data: null,
            error: new errorHandle({
                name: "EGetUserFailed",
                message: "unexpected error",
                stack: new Error("something unexpected happend").stack,
                errors: new Error("something unexpected happend") 
            })
        }
 
    }

}

export let addResfreshTokenTouser = async (refreshTokenID: string, id: string): Promise<returnType> => {
    try {
        let user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                refresh_token: refreshTokenID
            }
        })

        if (!user) {
            let err = new Error("updatong failed")
            throw new errorHandle({
                name: "EUpdateUserFailed",
                message: "updating user failed",
                errors: err,
                stack: err.stack
            })
        }

        return {
            data: user,
            error: null
        }
    } catch(error) {
        if (error instanceof errorHandle) {
            return {
                data: null,
                error: error
            }
        }

        return {
            data: null,
            error: new errorHandle({
                name: "EUpdateUserFailed",
                errors: new Error("unexpected error"),
                message: "unexpected happend",
                stack: ""
            })
        }
    }
}