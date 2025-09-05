import { useState } from 'react'

export const useFormeState = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [emailBorderError, setEmailBorderError] = useState(false)
    const [nameBorderError, setNameBorderError] = useState(false)
    const [isNameValid, setIsNameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        isEmailValid,
        setIsEmailValid,
        emailBorderError,
        setEmailBorderError,
        nameBorderError,
        setNameBorderError,
        setIsNameValid,
        isNameValid,
        isPasswordValid,
        setIsPasswordValid
    }
}
