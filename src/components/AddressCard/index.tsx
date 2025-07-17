import { Link } from 'react-router-dom'
import { AddressContainer } from './styles'
type AddressCardProps = {
    isDefault: boolean
    title: string
    street: string
    number: string
    neighborhood: string
    complement: string
    cep: string
    isSelect: boolean
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
    const handleIsAddressDefault = () => {
        localStorage.setItem('isDefault', `${isDefault}`)
    }

    return (
        <>
            <AddressContainer $isSelect={isSelect}>
                <header className="header-address">
                    <h3 className="address-card">{title}</h3>
                    <Link
                        to="/address"
                        className="edit-address"
                        onClick={handleIsAddressDefault}
                    >
                        <i className="fa-solid fa-pen-to-square" />
                    </Link>
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
