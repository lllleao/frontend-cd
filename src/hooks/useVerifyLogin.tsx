import { useEffect } from 'react'
import { useGetCookieMutation, useRefreshTokenMutation } from '../services/api'
import { isErrorMessageExist, isLoginAndCsrf } from '../utils'
import { useCsrfTokenStore } from './useFetchCsrfToken'
import useLogout from './useLogout'

export function useVerifyLogin() {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const logout = useLogout()

    const setRefreshTokenWarn = useCsrfTokenStore(
        (state) => state.setRefreshTokenWarn
    )
    const [getToken] = useGetCookieMutation()
    const [getRefresh] = useRefreshTokenMutation()

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getToken(csrfToken)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const message = res.error.data.message
                    if (message === 'Token expirado') {
                        getRefresh(csrfToken).then((response) => {
                            if (response.error) {
                                return logout()
                            }
                            localStorage.setItem('logado', 'true')
                            setRefreshTokenWarn(true).finally(() =>
                                setRefreshTokenWarn(false)
                            )
                        })
                        return undefined
                    } else {
                        return logout()
                    }
                }
                localStorage.setItem('logado', 'true')
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken])
}
