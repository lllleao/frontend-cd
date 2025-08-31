import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@/services/api'
import { useCsrfTokenStore } from './useFetchCsrfToken'
import { removeAllCache } from '@/utils/cacheConfig'

const useLogout = () => {
    const [logoutApi] = useLogoutMutation()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const navigate = useNavigate()

    return function logout(route: string) {
        localStorage.removeItem('logado')
        logoutApi(csrfToken)
            .then(() => {
                removeAllCache()
                navigate(route)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default useLogout
