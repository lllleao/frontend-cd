export const nameVerify = (name: string): boolean => {
    const regex = /^(?!\s*$).+/

    const isOnlySapce = regex.test(name)
    const parts = name.trim().split(' ')
    if (!isOnlySapce) return false
    if (parts.length < 2) return false
    if (parts[0].length < 3 || parts[1].length < 3) return false
    return true
}

export const emailVerify = (email: string): boolean => {
    const regex = /^\s+$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const isOnlySapce = regex.test(email)
    const isEmailValid = !isOnlySapce && emailPattern.test(email)

    return isEmailValid
}

export const phoneVerify = (phone: string): boolean => {
    const regex = /^\s+$/

    const isOnlySapce = regex.test(phone)
    const isPhoneValid = !isOnlySapce && phone.length === 16

    return isPhoneValid
}

export const textBoxVerify = (text: string): boolean => {
    const regex = /[^\p{L}\p{M}0-9!@?,.\s]/gu

    const scapeCaracter = regex.test(text)
    const isTextBoxValid =
        scapeCaracter || text.length < 19 || text.length > 100

    if (isTextBoxValid) return false

    return true
}

export const passwordVerify = (password: string): boolean => {
    const hasMinLength = password.length >= 8

    // não pode ser só números
    const isNumeric = /^\d+$/.test(password)

    // não pode ser só letras
    const isAlpha = /^[a-zA-Z]+$/.test(password)

    // não pode ser só espaços
    const isOnlySpace = /^\s+$/.test(password)

    // não pode conter caracteres proibidos
    const hasForbiddenChars = /[~<>\\.]/.test(password)

    return (
        hasMinLength &&
        !isNumeric &&
        !isAlpha &&
        !isOnlySpace &&
        !hasForbiddenChars
    )
}
