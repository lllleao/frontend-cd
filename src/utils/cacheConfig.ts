import React from 'react'

export const addItemToCache = (key: string, cache: unknown) => {
    const TWO_DAYS = 24 * 60 * 60 * 1000
    const timeExpiration = Date.now() + TWO_DAYS

    localStorage.setItem(key, JSON.stringify({ cache, timeExpiration }))
}

export const getItemFromCache = <T>(key: string): T | null => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export const removeFromCache = (key: string) => {
    localStorage.removeItem(key)
}

export const removeAllCache = () => {
    localStorage.removeItem('booksStore')
    localStorage.removeItem('publicBooks')
    localStorage.removeItem('specific1')
    localStorage.removeItem('specific2')
    localStorage.removeItem('specific3')
    localStorage.removeItem('isDefault')
    localStorage.removeItem('numberCart')
}

export const verifyIfIsCached = <T>(
    localCache: { cache: T; timeExpiration: number } | null,
    setData: React.Dispatch<React.SetStateAction<T | undefined>>,
    getData: (arg?: void) => Promise<{ data?: T }>,
    cacheName: string
) => {
    const dateNowToExpirationCache = Date.now()

    if (localCache && dateNowToExpirationCache < localCache.timeExpiration) {
        setData(localCache.cache)
        return;
    }

    getData().then((res) => {
        if (res.data) {
            setData(res.data)
            addItemToCache(cacheName, res.data)
        }
    })
}
