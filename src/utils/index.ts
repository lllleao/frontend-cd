import {
    emailVerify,
    nameVerify,
    phoneVerify,
    textBoxVerify
} from './inputfields'

export function authentic(
    emailUser: string,
    phone: string,
    name: string,
    text: string
) {
    const emailIsValid = emailVerify(emailUser)
    const phoneIsValid = phoneVerify(phone)
    const nameIsValid = nameVerify(name)
    const messageIsValid = textBoxVerify(text)

    return {
        emailIsValid,
        nameIsValid,
        phoneIsValid,
        messageIsValid
    }
}

type ErrorMessage = {
    error: { data: { message: string } }
}

export const isErrorMessageExist = (obj: unknown): obj is ErrorMessage => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'error' in obj &&
        typeof obj.error === 'object' &&
        obj.error !== null &&
        obj.error &&
        'data' in obj.error &&
        obj.error.data !== null &&
        typeof obj.error.data === 'object' &&
        'message' in obj.error.data
    )
}

export const isLoginAndCsrf = (
    logado: string | null,
    csrfToken: string | undefined
) => {
    if (!csrfToken) {
        return false
    }

    if (!logado) {
        return false
    }

    return true
}
export const isOnDevelopment =
    import.meta.env.VITE_ON_DEVELOPMENT === 'true' ? true : false
