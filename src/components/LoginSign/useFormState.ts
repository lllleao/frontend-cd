import { useState } from 'react'

export const useFormeState = () => {
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    const [nameEmpty, setNameEmpty] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [emailBorderError, setEmailBorderError] = useState(true)

    return {
        passwordEmpty,
        setPasswordEmpty,
        emailEmpty,
        setEmailEmpty,
        nameEmpty,
        setNameEmpty,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        isEmailValid,
        setIsEmailValid,
        emailBorderError,
        setEmailBorderError
    }
}
