import { FormEvent, useEffect, useState } from 'react'
import cpfValidator from '../../utils/cpfValidator'
import { useNavigate } from 'react-router-dom'
import { numberAndCaracterScape } from '../../utils/contactFunctions'
import {
    BarFormAddress,
    Finish,
    FormAddressContainer,
    TitleForms
} from './styles'
import {
    useCreateAddressMutation,
    useRefreshTokenMutation
} from '../../services/api'
import Loader from '../Loader'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { isErrorMessageExist } from '../../utils'
import useLogout from '../../hooks/useLogout'
import { authForms } from '../../utils/authInputForm'

const FormAddress = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const logout = useLogout()

    const isDefaulStoraget = localStorage.getItem('isDefault') as string
    const [isDefault, setIsDefault] = useState(true)
    const [isLoader, setIsLoader] = useState(false)

    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [neighborhood, setNeighborhoodeet] = useState('')
    const [complement, setComplement] = useState('')
    const [cpf, setCPF] = useState('')
    const [cep, setCEP] = useState('')
    const [number, setNumber] = useState('')
    const navigate = useNavigate()
    const [createAddress] = useCreateAddressMutation()
    const [getRefresh] = useRefreshTokenMutation()

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
                .catch((err) => console.log(err))
        }
    }

    const handleNumber = (numberValue: string) => {
        if (numberValue.length <= 6) {
            setNumber(numberValue)
        }
    }

    // const authForms = () => {
    //     const regex = /^\s+$/
    //     const cepScape = cep.replace(/\D/g, '')
    //     const isNameValid =
    //         name &&
    //         !regex.test(name) &&
    //         name.length > 3 &&
    //         name.includes(' ')
    //     const isCpfValid = cpfValidator(cpf)
    //     const isCepValid = cepScape.length === 8
    //     const isStreetValid = street.length <= 40
    //     const isNeighborhoodValid = neighborhood.length <= 40
    //     const isComplementValid =
    //         complement.length <= 40 || complement.length === 0
    //     const isNumberValid = number.length <= 6

    //     return {
    //         isNameValid,
    //         isCpfValid,
    //         isCepValid,
    //         isStreetValid,
    //         isNeighborhoodValid,
    //         isComplementValid,
    //         isNumberValid
    //     }
    // }

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
        } = authForms(
            name,
            cep,
            cpf,
            street,
            neighborhood,
            complement,
            number,
            cpfValidator
        )

        if (
            isCepValid &&
            isComplementValid &&
            isCpfValid &&
            isNameValid &&
            isNeighborhoodValid &&
            isNumberValid &&
            isStreetValid &&
            csrfToken
        ) {
            setIsLoader(true)
            createAddress({
                csrfToken,
                data: {
                    zipCode: cep.trim().replace(/\D/g, ''),
                    complement: complement.trim(),
                    cpf: cpf.trim().replace(/\D/g, ''),
                    name: name.trim(),
                    neighborhood: neighborhood.trim(),
                    number: number.trim(),
                    isDefault,
                    street: street.trim()
                }
            })
                .then((res) => {
                    if (isErrorMessageExist(res)) {
                        const message = res.error.data.message as string
                        if (message === 'Token expirado') {
                            return getRefresh(csrfToken)
                                .then((response) => {
                                    if (response.error) {
                                        logout('/')
                                        return
                                    }
                                    localStorage.setItem('logado', 'true')
                                    createAddress({
                                        csrfToken,
                                        data: {
                                            zipCode: cep
                                                .trim()
                                                .replace(/\D/g, ''),
                                            complement: complement.trim(),
                                            cpf: cpf.trim().replace(/\D/g, ''),
                                            name: name.trim(),
                                            neighborhood: neighborhood.trim(),
                                            number: number.trim(),
                                            isDefault,
                                            street: street.trim()
                                        }
                                    }).then(() => {
                                        setIsLoader(false)
                                        navigate('/profile')
                                    })
                                })
                                .catch((error) => {
                                    console.log(error, 'err')
                                })
                        }
                        logout('/')
                        return
                    }
                    setIsLoader(false)
                    navigate('/profile')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isDefaulStoraget === 'true' ? setIsDefault(true) : setIsDefault(false)
    }, [isDefaulStoraget, logado, navigate])
    return (
        <>
            <BarFormAddress>
                <div className="bar" />
            </BarFormAddress>
            <TitleForms>
                {isDefault ? 'Endereço Padrão' : 'Endereço Secundário'}
            </TitleForms>
            <FormAddressContainer $errorCEP={errorCEP} $errorCPF={errorCpf}>
                <form onSubmit={(e) => handleSubmit(e)} className="form">
                    <div className="form__credentials">
                        <div className="text-field-name">
                            <label className="form__label" htmlFor="name">
                                Nome Completo
                                <span className="star">*</span>
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
                        </div>

                        <div className="text-field-cpf">
                            <label className="form__label" htmlFor="cpf">
                                CPF
                                <span className="star">*</span>
                            </label>
                            <input
                                value={cpf}
                                onChange={(e) => cpfMask(e.target.value)}
                                required
                                id="cpf"
                                className="form__input cpf"
                            />
                        </div>
                    </div>

                    <div className="form__address-container">
                        <div className="first-field">
                            <div className="text-field-cep">
                                <label className="form__label" htmlFor="cep">
                                    CEP
                                    <span className="star">*</span>
                                </label>
                                <input
                                    value={cep || ''}
                                    onChange={(e) => cepMask(e.target.value)}
                                    required
                                    id="cep"
                                    className="form__input cep"
                                    type="text"
                                />
                            </div>

                            <div className="text-field-street">
                                <label className="form__label" htmlFor="street">
                                    Rua
                                    <span className="star">*</span>
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
                            </div>
                        </div>

                        <div className="second-field">
                            <div className="text-field-neighborhood">
                                <label
                                    className="form__label"
                                    htmlFor="neighborhood"
                                >
                                    Bairro
                                    <span className="star">*</span>
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
                            </div>
                            <div className="text-field-complement">
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
                            </div>
                        </div>

                        <div className="text-field-numberAddress">
                            <label
                                className="form__label number-label"
                                htmlFor="numberAddress"
                            >
                                Número
                                <span className="star">*</span>
                            </label>
                            <input
                                value={number}
                                onChange={(e) => handleNumber(e.target.value)}
                                required
                                id="numberAddress"
                                className="form__input number-input"
                                type="number"
                            />
                        </div>
                    </div>
                    <Finish type="submit">Confirmar o endereço</Finish>
                    {isLoader ? <Loader isCircle /> : <></>}
                </form>
            </FormAddressContainer>
        </>
    )
}

export default FormAddress
