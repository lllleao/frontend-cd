import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@/services/api'
import { useCsrfTokenStore } from './useFetchCsrfToken'
import { removeAllCache } from '@/utils/cacheConfig'
import { useProfileData } from './useProfileData'

const useLogout = () => {
    const [logoutApi] = useLogoutMutation()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const setProfileAddress = useProfileData((state) => state.setProfileAddress)
    const navigate = useNavigate()
    const defaultAddress = [
        {
            name: 'Nome Completo',
            cpf: '00000000000',
            zipCode: '00000000',
            street: 'Padrão',
            neighborhood: 'Padrão',
            complement: 'Complemento Padrão',
            number: '123A',
            isDefault: true,
            id: 1
        },
        {
            name: 'Nome Completo',
            cpf: '00000000000',
            zipCode: '00000000',
            street: 'Padrão',
            neighborhood: 'Padrão',
            complement: 'Complemento Padrão',
            number: '123A',
            isDefault: false,
            id: 2
        }
    ]

    return function logout(route: string) {
        localStorage.removeItem('logado')
        logoutApi(csrfToken)
            .then(() => {
                removeAllCache()
                setProfileAddress(defaultAddress)
                navigate(route)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default useLogout
