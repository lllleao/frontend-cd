import { FormEvent, useEffect, useState } from 'react'
import { numberAndCaracterScape } from '../../utils/contactFunctions'
import { CheckoutContainer, Finish } from './styles'
import {
    useGetCookieMutation,
    useGetItemsCartQuery,
    useGetTotalPriceQuery,
    usePurchaseDataMutation
} from '../../services/api'
import { useNavigate } from 'react-router-dom'
import cpfValidator from '../../utils/cpfValidator'
import Header from '../../containers/Header'

const Checkout = () => {
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [neighborhood, setNeighborhoodeet] = useState('')
    const [complement, setComplement] = useState('')
    const [cpf, setCPF] = useState('')
    const [cep, setCEP] = useState('')
    const [number, setNumber] = useState('')
    const { data } = useGetItemsCartQuery()
    const { data: totalPrice } = useGetTotalPriceQuery()
    const [getCookie] = useGetCookieMutation()
    const [doPurchase] = usePurchaseDataMutation()
    const navigate = useNavigate()

    const [errorCEP, setErrorCEP] = useState(false)
    const [errorCpf, setErrorCpf] = useState(false)

    const scapeSpecialCaracter = (
        street: string,
        setValue: (value: React.SetStateAction<string>) => void
    ) => {
        const value = street
            .replace(/^[\s]+/, '')
            .replace(/[^a-zA-Z0-9\u00C0-\u00FF\u0100-\u017F\s]/g, '')
        if (value.length <= 40) {
            setValue(value)
        }
    }

    const cpfMask = (cpfValue: string) => {
        let cpfNewValue = cpfValue

        cpfNewValue = cpfNewValue.replace(/\D/g, '')

        cpfNewValue = cpfNewValue.replace(/(\d{3})(\d)/, '$1.$2')
        cpfNewValue = cpfNewValue.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        cpfNewValue = cpfNewValue.replace(
            /(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/,
            '$1.$2.$3-$4'
        )

        if (cpfNewValue.length > 14) cpfNewValue = cpfNewValue.slice(0, 14)
        if (cpfNewValue.length === 14 && !cpfValidator(cpfNewValue)) {
            setErrorCpf(true)
        } else {
            setErrorCpf(false)
        }
        setCPF(cpfNewValue)
    }

    const cepMask = (cepValue: string) => {
        let value = cepValue.replace(/\D/g, '')
        if (value.length > 8) value = value.slice(0, 8)
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5)
        }

        setCEP(value)

        if (value.length === 9) {
            const endpoint = `http://viacep.com.br/ws/${value.replace(/\D/g, '')}/json`
            fetch(endpoint, {
                method: 'GET'
            })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (res.erro) {
                        console.log('Erro cep')
                        return setErrorCEP(true)
                    }
                    setErrorCEP(false)
                    setStreet(res.logradouro || '')
                    setNeighborhoodeet(res.bairro || '')
                })
        }
    }

    const handleNumber = (numberValue: string) => {
        if (numberValue.length <= 6) {
            setNumber(numberValue)
        }
    }

    const authForms = () => {
        const regex = /^\s+$/
        const cepScape = cep.replace(/\D/g, '')
        const isNameValid = name.length !== 0 && !regex.test(name)
        const isCpfValid = cpfValidator(cpf)
        const isCepValid = cepScape.length === 8
        const isStreetValid = street.length <= 40
        const isNeighborhoodValid = neighborhood.length <= 40
        const isComplementValid =
            complement.length <= 40 || complement.length === 0
        const isNumberValid = number.length <= 6

        return {
            isNameValid,
            isCpfValid,
            isCepValid,
            isStreetValid,
            isNeighborhoodValid,
            isComplementValid,
            isNumberValid
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {
            isCepValid,
            isComplementValid,
            isCpfValid,
            isNameValid,
            isNeighborhoodValid,
            isNumberValid,
            isStreetValid
        } = authForms()

        if (
            isCepValid &&
            isComplementValid &&
            isCpfValid &&
            isNameValid &&
            isNeighborhoodValid &&
            isNumberValid &&
            isStreetValid
        ) {
            if (data && totalPrice) {
                doPurchase({
                    cep: cep.trim().replace(/\D/g, ''),
                    complement: complement.trim(),
                    cpf: cpf.trim().replace(/\D/g, ''),
                    name: name.trim(),
                    neighborhood: neighborhood.trim(),
                    number: number.trim(),
                    street: street.trim(),
                    itemsInfo: data.items.map(
                        ({ name, photo, price, quant, id }) => {
                            return {
                                name,
                                photo,
                                price,
                                quant,
                                id
                            }
                        }
                    ),
                    totalPrice: totalPrice.totalPrice
                })
            }
        }
    }

    useEffect(() => {
        getCookie().then((res) => {
            if (res.error) {
                console.log(res.error)
                navigate('/login')
            }
        })
    }, [getCookie, navigate])

    return (
        <>
            <Header />
            <CheckoutContainer $errorCPF={errorCpf} $errorCEP={errorCEP}>
                <div className="container">
                    <div className="bar-container">
                        <div className="bar">
                            <div className="bar-ball">1</div>
                            <div className="bar-ball" />
                            <div className="bar-ball" />
                        </div>
                    </div>
                    <div className="form-checkout">
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="form"
                        >
                            <label className="form__label" htmlFor="name">
                                Nome Completo
                            </label>
                            <input
                                value={name}
                                onChange={(e) =>
                                    numberAndCaracterScape(
                                        e.target.value,
                                        setName
                                    )
                                }
                                required
                                id="name"
                                className="form__input name"
                                type="text"
                            />

                            <label className="form__label" htmlFor="cpf">
                                CPF
                            </label>
                            <input
                                value={cpf}
                                onChange={(e) => cpfMask(e.target.value)}
                                required
                                id="cpf"
                                className="form__input cpf"
                            />
                            <div className="form__address-container">
                                <label className="form__label" htmlFor="cep">
                                    CEP
                                </label>
                                <input
                                    value={cep || ''}
                                    onChange={(e) => cepMask(e.target.value)}
                                    required
                                    id="cep"
                                    className="form__input cep"
                                    type="text"
                                />

                                <label className="form__label" htmlFor="street">
                                    Rua
                                </label>
                                <input
                                    value={street}
                                    onChange={(e) =>
                                        scapeSpecialCaracter(
                                            e.target.value,
                                            setStreet
                                        )
                                    }
                                    required
                                    id="street"
                                    className="form__input street"
                                    type="text"
                                />
                                <br />

                                <label
                                    className="form__label"
                                    htmlFor="neighborhood"
                                >
                                    Bairro
                                </label>
                                <input
                                    value={neighborhood}
                                    onChange={(e) =>
                                        numberAndCaracterScape(
                                            e.target.value,
                                            setNeighborhoodeet
                                        )
                                    }
                                    required
                                    id="neighborhood"
                                    className="form__input neighborhood"
                                    type="text"
                                />

                                <label
                                    className="form__label"
                                    htmlFor="complement"
                                >
                                    Complemento
                                </label>
                                <input
                                    value={complement}
                                    onChange={(e) =>
                                        scapeSpecialCaracter(
                                            e.target.value,
                                            setComplement
                                        )
                                    }
                                    id="complement"
                                    className="form__input complement"
                                    type="text"
                                />
                                <br />

                                <label
                                    className="form__label number-label"
                                    htmlFor="numberAddress"
                                >
                                    Número
                                </label>
                                <input
                                    value={number}
                                    onChange={(e) =>
                                        handleNumber(e.target.value)
                                    }
                                    required
                                    id="numberAddress"
                                    className="form__input number-input"
                                    type="number"
                                />
                            </div>
                            <Finish type="submit">Finalizar Compra</Finish>
                        </form>
                    </div>
                    <div className="books-purchase">
                        <ul className="books-list">
                            {data &&
                                data.items.map(({ id, photo, name, quant }) => (
                                    <li key={id}>
                                        <img
                                            className="book-img"
                                            src={photo}
                                            alt=""
                                        />
                                        <div className="book-title">
                                            <h5>{name}</h5>
                                            <p>{quant} unidade(s)</p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        <p className="price-tot">
                            Preço Total R$ {totalPrice?.totalPrice},00
                        </p>
                    </div>
                </div>
            </CheckoutContainer>
        </>
    )
}

export default Checkout
