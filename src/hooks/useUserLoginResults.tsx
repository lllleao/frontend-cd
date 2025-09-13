import { useDispatch } from 'react-redux'
import { checkLoginUser } from '@/store/reducers/loginSign'
import useLogout from './useLogout'

export type LoginErrorMessage =
    | 'Usuário já logado'
    | 'Senha incorreta.'
    | 'Email não verificado.'
    | 'Usuário não existe.'
    | 'CSRF token ausente no cabeçalho da requisição.'
    | 'Você atingiu o limite de requisições.'

const useUserLoginResults = () => {
    const logout = useLogout()
    const dispatch = useDispatch()

    const handleUserAlreadyLogged = () => {
        dispatch(
            checkLoginUser({
                msg: 'Usuário já logado',
                loginUserExist: true,
                loginSuccess: false
            })
        )
        setTimeout(() => {
            dispatch(
                checkLoginUser({
                    loginUserExist: false
                })
            )
            logout('/')
        }, 1000)
    }

    const handleWrongPassword = () => {
        dispatch(
            checkLoginUser({
                msg: 'Senha Incorreta',
                loginUserExist: true,
                loginSuccess: false
            })
        )
    }

    const handleUnverifiedEmail = () => {
        dispatch(
            checkLoginUser({
                msg: 'Email não verificado.',
                loginUserExist: true,
                loginSuccess: false
            })
        )
    }

    const handleUserNotExist = () => {
        dispatch(
            checkLoginUser({
                msg: 'Email não existe.',
                loginUserExist: true,
                loginSuccess: false
            })
        )
    }

    const handleUserCSRFTOKEN = () => {
        dispatch(
            checkLoginUser({
                msg: 'Requisição não autorizada',
                missToken: true,
                loginUserExist: false
            })
        )
    }

    const handleTooManyReqs = () => {
        dispatch(
            checkLoginUser({
                msg: 'Muitas tentativas, tente mais tarde',
                loginUserExist: true,
                loginSuccess: false
            })
        )
    }

    const errorHandlers: Record<LoginErrorMessage, () => void> = {
        'Usuário já logado': handleUserAlreadyLogged,
        'Email não verificado.': handleUnverifiedEmail,
        'Senha incorreta.': handleWrongPassword,
        'Usuário não existe.': handleUserNotExist,
        'CSRF token ausente no cabeçalho da requisição.': handleUserCSRFTOKEN,
        'Você atingiu o limite de requisições.': handleTooManyReqs
    }

    return errorHandlers
}

export default useUserLoginResults
