export const handleValidEmail = (
    value: string,
    setEmail: (value: React.SetStateAction<string>) => void,
    setIsEmailValid: (value: React.SetStateAction<boolean>) => void,
    setEmailBorderError: (value: React.SetStateAction<boolean>) => void
) => {
    setEmail(value)
    const regex = /^\s+$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const testValidation = emailPattern.test(value)
    const isEmpty = regex.test(value)
    if (value.length !== 0 && !testValidation && !isEmpty) {
        setEmailBorderError(false)
    } else {
        setEmailBorderError(true)
    }

    setIsEmailValid(testValidation)
}

export const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8
    const isNumeric = /^\d+$/.test(password)
    const isAlpha = /^[a-zA-Z]+$/.test(password)
    const isOnlySpace = /^\s+$/.test(password)

    return hasMinLength && !isNumeric && !isAlpha && !isOnlySpace
}
