import { useDispatch } from 'react-redux'
import { checkSignUser } from '../store/reducers/loginSign'

export type SignErrorMessage =
    | 'CSRF token ausente no cabeçalho da requisição.'
    | 'Este email já está em uso.'

const useUserSignResults = (setIsLoader: (value: React.SetStateAction<boolean>) => void ) => {
    const dispatch = useDispatch()

    const handleUserCSRFTOKEN = () => {
        setIsLoader(false)

        dispatch(
            checkSignUser({
                msg: 'Requisição não autorizada',
                signUserExist: false
            })
        )
    }

    const handleEmailExist = () => {
        setIsLoader(false)
        dispatch(
            checkSignUser({
                msg: 'Este email já está em uso.',
                signUserExist: true,
            })
        )
    }

    const errorHandlers: Record<SignErrorMessage, () => void> = {
        'CSRF token ausente no cabeçalho da requisição.': handleUserCSRFTOKEN,
        'Este email já está em uso.': handleEmailExist
    }

    return errorHandlers
}

export default useUserSignResults
