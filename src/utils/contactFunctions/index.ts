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

export const nameMask = (name: string, setName: (value: React.SetStateAction<string>) => void) => {
    let value = name
    value = value.replace(/[^a-zA-Z\s]/g, '')
    setName(value)
}
