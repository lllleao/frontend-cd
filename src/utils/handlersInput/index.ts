import { numberAndCaracterScape, numeroMask } from '../contactFunctions'
import {
    emailVerify,
    nameVerify,
    passwordVerify,
    phoneVerify
} from '../inputfields'

export const handleEmailUser = (
    email: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setInputError: (value: React.SetStateAction<boolean>) => void,
    setIsValid?: (value: React.SetStateAction<boolean>) => void
) => {
    const isEmailValid = emailVerify(email)
    setValue(email)
    if (setIsValid) setIsValid(isEmailValid)

    if (isEmailValid || !email) return setInputError(false)
    setInputError(true)
}

export const handleNameUser = (
    name: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setInputError: (value: React.SetStateAction<boolean>) => void,
    setIsValid?: (value: React.SetStateAction<boolean>) => void
) => {
    numberAndCaracterScape(name, setValue)
    const isNameValid = nameVerify(name)

    if (setIsValid) setIsValid(isNameValid)

    if (isNameValid || !name) return setInputError(false)
    setInputError(true)
}

export const handlePhoneUser = (
    phone: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setInputError: (value: React.SetStateAction<boolean>) => void
) => {
    numeroMask(phone, setValue)
    const isPhoneValid = phoneVerify(phone)
    if (isPhoneValid || !phone) return setInputError(false)
    setInputError(true)
}

export const handleTextBox = (
    text: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setInputError: (value: React.SetStateAction<boolean>) => void
) => {
    const regex = /[^\p{L}\p{M}0-9!@?,.\s]/gu
    const value = text.replace(regex, '')

    if (value.length < 100) setValue(value)
    if (text.length > 18) setInputError(false)
}

export const handlePassword = (
    password: string,
    setValue: (value: React.SetStateAction<string>) => void,
    setIsValid: (value: React.SetStateAction<boolean>) => void
) => {
    setValue(password)
    const isPasswordValid = passwordVerify(password)
    setIsValid(isPasswordValid)
}
