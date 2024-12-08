export const handleValidEmail = (
    value: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setValidation: (value: React.SetStateAction<boolean>) => void,
    setEmailBorderError: (value: React.SetStateAction<boolean>) => void
) => {
    setValue(value)
    const regex = /^\s+$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{3,}$/
    const testValidation = emailPattern.test(value)
    const isEmpty = regex.test(value)
    if (value.length !== 0 && !testValidation && !isEmpty) {
        setEmailBorderError(false)
    } else {
        setEmailBorderError(true)
    }

    setValidation(testValidation)
}
