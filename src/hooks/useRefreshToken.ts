import { isErrorMessageExist } from '@/utils'
import useLogout from './useLogout'
import { useCsrfTokenStore } from './useFetchCsrfToken'
import { useRefreshTokenMutation } from '@/services/api'

type RecebeGenerica = (...args: unknown[]) => unknown

const useRefreshToken = () => {
    const logout = useLogout()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [getRefresh] = useRefreshTokenMutation()

    const refresheTokenFunction = (
        res: unknown,
        actionAferSuccess?: RecebeGenerica
    ) => {
        if (isErrorMessageExist(res)) {
            const message = res.error.data.message
            if (message === 'Token expirado') {
                getRefresh(csrfToken).then((response) => {
                    if (response.error) {
                        return logout('/')
                    }
                    if (actionAferSuccess) actionAferSuccess()
                })
                return undefined
            }
            return logout('/')
        }
    }

    return refresheTokenFunction
}

export default useRefreshToken
