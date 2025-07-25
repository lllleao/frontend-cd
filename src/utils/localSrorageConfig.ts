export const addItemToCache = (key: string, cache: unknown) => {
    localStorage.setItem(key, JSON.stringify(cache))
}

export const getItemFromCache = <T>(key: string): T | null => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export const removeFromCache = (key: string) => {
    localStorage.removeItem(key)
}
