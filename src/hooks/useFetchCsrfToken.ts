import { create } from 'zustand'

type CsrfStore = {
    csrfToken: string | undefined
    setCsrfToken: (token: string) => void
    fetchCsrfToken: () => Promise<void>
}

export const useCsrfTokenStore = create<CsrfStore>((set) => ({
    csrfToken: undefined,

    setCsrfToken: (token: string) => set({ csrfToken: token }),

    fetchCsrfToken: async () => {
        try {
            const res = await fetch('http://localhost:3000/auth/get-csrfToken', {
                credentials: 'include',
                method: 'POST'
            })

            const token = await res.json()
            // const token = res as unknown as { token: string }
            // console.log(token.token)
            set({ csrfToken: token.token })
        } catch (err) {
            console.error('Erro ao buscar CSRF token:', err)
        }
    }
}))
