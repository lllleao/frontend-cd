import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { useVerifyLogin } from '@/hooks/useVerifyLogin'
import { Navigate } from 'react-router-dom'

type RouteGuardsType = {
    children: JSX.Element
}

export const PrivateRoute = ({ children }: RouteGuardsType) => {
    const loggedIOS = useCsrfTokenStore((state) => state.logadoIos)
    useVerifyLogin()

    const isLoggedIn = localStorage.getItem('logado') || loggedIOS
    return isLoggedIn ? children : <Navigate to="/" replace />
}

export const PublicRoute = ({ children }: RouteGuardsType) => {
    const loggedIOS = useCsrfTokenStore((state) => state.logadoIos)

    const isLoggedIn = localStorage.getItem('logado') || loggedIOS
    return isLoggedIn ? <Navigate to="/profile" replace /> : children
}
