export const normalStringValidation = new RegExp(
    /^[A-Za-z. ]+$/
)

export const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export type errorName = 'ECreateUserFailed' | 'EGetUserFailed' | 'EUpdateUserFailed' | 'EResertPasswordFailed'

export class errorHandle extends Error {
    name: errorName
    message: string
    errors: Error
    stack: string | undefined

    constructor({name, message, errors, stack}:{name: errorName, message: string, errors: any, stack: string}) {
        super()
        this.name = name
        this.message = message
        this.errors = errors,
        this.stack = stack
    }
}
