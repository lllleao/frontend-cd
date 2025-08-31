import { useNavigate } from 'react-router-dom'
import { AddressContainer } from './styles'
import { useGetCookieMutation, useRefreshTokenMutation } from '@/services/api'
import { isErrorMessageExist } from '@/utils'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import useLogout from '@/hooks/useLogout'
type AddressCardProps = {
    isDefault: boolean
    title: string
    street: string
    number: string
    neighborhood: string
    complement: string
    cep: string
    isSelect?: boolean
    cpf: string
    name: string
}

const AddressCard = ({
    isDefault,
    title,
    cep,
    complement,
    neighborhood,
    number,
    street,
    isSelect,
    cpf,
    name
}: AddressCardProps) => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const [getToken] = useGetCookieMutation()
    const [getRefresh] = useRefreshTokenMutation()
    const logout = useLogout()
    const navigate = useNavigate()

    const handleIsAddressDefault = () => {
        getToken(csrfToken).then((res) => {
            if (isErrorMessageExist(res)) {
                const message = res.error.data.message
                if (message === 'Token expirado') {
                    getRefresh(csrfToken).then((response) => {
                        if (response.error) {
                            return logout('/')
                        }
                    })
                    return undefined
                } else {
                    return logout('/')
                }
            }
            localStorage.setItem('isDefault', `${isDefault}`)
            navigate('/address')
        })
    }

    return (
        <>
            <AddressContainer $isSelect={isSelect}>
                <header className="header-address">
                    <h3 className="address-card">{title}</h3>
                    <a
                        className="edit-address"
                        onClick={handleIsAddressDefault}
                    >
                        <i className="fa-solid fa-pen-to-square" />
                    </a>
                </header>
                <div className="card-address">
                    {isDefault ? (
                        <i className="fa-solid fa-house" />
                    ) : (
                        <i className="fa-solid fa-building" />
                    )}
                    <div className="address">
                        <span className="name">
                            <label className="tag">Nome:</label> {name}
                        </span>
                        <div className="rua-num">
                            <span>
                                <label className="tag">Rua:</label> {street}
                            </span>
                            <span>
                                <label className="tag">Número:</label> {number}
                            </span>
                        </div>
                        <p>
                            <label className="tag">Bairro:</label>{' '}
                            {neighborhood}
                        </p>
                        <p className="address-info">
                            <label className="tag">Complemento:</label>{' '}
                            {complement}
                        </p>
                        <p className="cep">
                            <label className="tag">CEP:</label> {cep}
                        </p>
                        <p>
                            <label className="tag">CPF:</label> {cpf}
                        </p>
                    </div>
                </div>
            </AddressContainer>
        </>
    )
}

export default AddressCard
