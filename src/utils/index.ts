export function authentic(
    emailUser: string,
    numEmail?: string,
    name?: string,
    text?: string
) {
    const regex = /^\s+$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{3,}$/
    const emailIsValid = emailPattern.test(emailUser)
    const nameIsValid = name?.length === 0 || regex.test(name as string)
    const numberIsValid = numEmail?.length === 16 || numEmail?.length === 0
    const messageIsValid = text?.length === 0 || regex.test(text as string)

    return {
        emailIsValid,
        nameIsValid,
        numberIsValid,
        messageIsValid
    }
}

export const defaultAddress = [
    {
        data: {
            name: '',
            cpf: '00000000000',
            zipCode: '00000000',
            street: 'Padrão',
            neighborhood: 'Padrão',
            complement: 'Complemento Padrão',
            number: '123A',
            isDefault: false
        }
    }
]

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
