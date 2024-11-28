import { NavigateFunction } from "react-router-dom"

export function brFunction(dates: string): {
    firstPart: string
    secondPart: string
} {
    const firstPart = dates.slice(0, 14)
    const secondPart = dates.slice(20, 37)
    return { firstPart, secondPart }
}

export function authentic(emailUser: string, numEmail?: string, name?: string, text?: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{3,}$/
    const emailIsValid = emailPattern.test(emailUser)
    const nameIsValid = name?.length === 0
    const numberIsValid = numEmail?.length === 16 || numEmail?.length === 0
    const messageIsValid = text?.length === 0

    return {
        emailIsValid,
        nameIsValid,
        numberIsValid,
        messageIsValid
    }
}

type RedDown = {
    hero: boolean
    publicLb: boolean
    purchase: boolean
    contactUs: boolean
    cart: boolean
    user: boolean
}

export const handleRedDown = (textElement: string, setFunction: React.Dispatch<React.SetStateAction<RedDown>>, navigate: NavigateFunction) => {
    if (textElement === 'hero') {
        setFunction({
            hero: true,
            publicLb: false,
            purchase: false,
            contactUs: false,
            cart: false,
            user: false
        })
    } else if (textElement === 'publicLb') {
        setFunction({
            hero: false,
            publicLb: true,
            purchase: false,
            contactUs: false,
            cart: false,
            user: false
        })
    } else if (textElement === 'purchase') {
        setFunction({
            hero: false,
            publicLb: false,
            purchase: true,
            contactUs: false,
            cart: false,
            user: false
        })
    } else if (textElement === 'contactUs') {
        setFunction({
            hero: false,
            publicLb: false,
            purchase: false,
            contactUs: true,
            cart: false,
            user: false
        })
    } else if (textElement === 'user') {
        navigate('/user')
        setFunction({
            hero: false,
            publicLb: false,
            purchase: false,
            contactUs: false,
            cart: false,
            user: true
        })
    } else {
        setFunction({
            hero: false,
            publicLb: false,
            purchase: false,
            contactUs: false,
            cart: true,
            user: false
        })
    }
}

export const apiUrl = import.meta.env.VITE_API_URL
