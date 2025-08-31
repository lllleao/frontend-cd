import React from 'react'

/* eslint-disable @typescript-eslint/no-unused-expressions */
export const handleFocus = (
    event: React.FocusEvent<HTMLInputElement>,
    setEmpty: (value: React.SetStateAction<boolean>) => void
) => {
    const currentElement = event.target.classList[1]

    if (setEmpty) {
        currentElement === 'name' && setEmpty(true)
        currentElement === 'email' && setEmpty(true)
        currentElement === 'number' && setEmpty(true)
        currentElement === 'password' && setEmpty(true)
    }
}

export const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    setEmpty: (value: React.SetStateAction<boolean>) => void
) => {
    const currentElement = event.target.classList[1]

    if (event.target.value.length === 0 && setEmpty) {
        currentElement === 'name' && setEmpty(false)
        currentElement === 'email' && setEmpty(false)
        currentElement === 'number' && setEmpty(false)
        currentElement === 'password' && setEmpty(false)
    }
}

export const numberAndCaracterScape = (
    name: string,
    setName: (value: React.SetStateAction<string>) => void
) => {
    let value = name
    value = value
        .replace(/^[\s]+/, '')
        .replace(/[^a-zA-Z\u00C0-\u00FF\u0100-\u017F\s]/g, '')

    if (value.length <= 40) {
        setName(value)
    }
}

export function numeroMask(
    numero: string,
    setValue: (value: React.SetStateAction<string>) => void
) {
    let digits = numero.replace(/\D/g, '')

    if (digits.length > 11) {
        digits = digits.substring(0, 11)
    }

    let formatted = digits

    if (digits.length > 2) {
        formatted = `(${digits.substring(0, 2)}) ${digits.substring(2)}`
    }

    if (digits.length > 7) {
        formatted = `(${digits.substring(0, 2)}) ${digits.substring(2, 3)} ${digits.substring(3, 7)}-${digits.substring(7)}`
    }

    setValue(formatted)
}
