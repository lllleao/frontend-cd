export const handleValidEmail = (value: string, setValue: (value: React.SetStateAction<string>) => void, setValidation: (value: React.SetStateAction<boolean>) => void, setEmailBorderError: (value: React.SetStateAction<boolean>) => void) => {
    setValue(value)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{3,}$/
    const testValidation = emailPattern.test(value)
    if (value.length !== 0 && !testValidation) {
        setEmailBorderError(false)
    } else {
        setEmailBorderError(true)
    }

    setValidation(testValidation)
}
