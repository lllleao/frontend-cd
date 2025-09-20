import { Navigate } from 'react-router-dom'

type RouteGuardsType = {
    children: JSX.Element
}

export const PrivateRoute = ({ children }: RouteGuardsType) => {
    const isLoggedIn = localStorage.getItem('logado')
    return isLoggedIn ? children : <Navigate to="/" replace />
}

export const PublicRoute = ({ children }: RouteGuardsType) => {
    const isLoggedIn = localStorage.getItem('logado')
    return isLoggedIn ? <Navigate to="/profile" replace /> : children
}
