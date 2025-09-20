import { useEffect } from 'react'
import { useGetCookieMutation } from '@/services/api'
import { useCsrfTokenStore } from './useFetchCsrfToken'
import useRefreshToken from './useRefreshToken'
import { isLoginAndCsrf } from '@/utils'

export function useVerifyLogin() {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const refresheTokenFunction = useRefreshToken()
    const logado = localStorage.getItem('logado')

    const setRefreshTokenWarn = useCsrfTokenStore(
        (state) => state.setRefreshTokenWarn
    )

    const [getToken] = useGetCookieMutation()

    const setLogged = useCsrfTokenStore((state) => state.setLogged)
    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        console.log('open')
        getToken(csrfToken)
            .then((res) => {
                setLogged(JSON.stringify(res, null, 2))
                if (res.error) {
                    return refresheTokenFunction(res, () => {
                        localStorage.setItem('logado', 'true')
                        setRefreshTokenWarn(true).finally(() =>
                            setRefreshTokenWarn(false)
                        )
                    })
                }
                localStorage.setItem('logado', 'true')
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken])
}
