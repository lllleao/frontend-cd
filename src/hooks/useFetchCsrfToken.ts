import { create } from 'zustand'

type CsrfStore = {
    csrfToken: string | undefined
    setCsrfToken: (token: string) => void
    setViweNumberCart: (viweNumberCart: boolean) => void
    fetchCsrfToken: () => Promise<unknown>
    viweNumberCart: boolean
    refreshTokenWarn: boolean
    setRefreshTokenWarn: (value: boolean) => Promise<unknown>
}

export const useCsrfTokenStore = create<CsrfStore>((set) => ({
    csrfToken: undefined,
    viweNumberCart: false,
    refreshTokenWarn: false,

    setCsrfToken: (token: string) => set({ csrfToken: token }),

    setViweNumberCart: (viweNumberCart: boolean) => set({ viweNumberCart }),

    setRefreshTokenWarn: (value: boolean) => {
        return new Promise((resolve) => {
            resolve(set({ refreshTokenWarn: value }))
        })
    },

    fetchCsrfToken: async () => {
        try {
            const res = await fetch(
                'http://localhost:3000/auth/get-csrfToken',
                {
                    credentials: 'include',
                    method: 'POST'
                }
            )

            const token = await res.json()
            set({ csrfToken: token.token })
        } catch (err) {
            console.error('Erro ao buscar CSRF token:', err)
            throw new Error('Erro ao buscar CSRF token')
        }
    }
}))
