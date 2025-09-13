import { useNavigate } from 'react-router-dom'
import { AddressContainer } from './styles'
import { useGetCookieMutation } from '@/services/api'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import useRefreshToken from '@/hooks/useRefreshToken'
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
    const navigate = useNavigate()
    const refresheTokenFunction = useRefreshToken()

    const handleIsAddressDefault = () => {
        getToken(csrfToken).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    localStorage.setItem('isDefault', `${isDefault}`)
                    navigate('/address')
                })
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
