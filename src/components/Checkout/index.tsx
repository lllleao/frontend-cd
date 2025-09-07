import { useEffect, useState } from 'react'
import { CheckoutContainer, ChoseAddress, ValidAddres } from './styles'

import ProfileAddress from '@/components/AddressCard'
import { Finish } from '@/components/FormAddress/styles'
import { defaultAddress, isLoginAndCsrf } from '@/utils'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { GetAddressProps } from '@/interfaces/interfaces'
import {
    useLazyGetAddressQuery,
    useLazyGetItemsCartQuery,
    useLazyGetTotalPriceQuery,
    usePurchaseDataMutation
} from '@/services/api'

const Checkout = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')

    const [getDataItems, { data }] = useLazyGetItemsCartQuery()
    const [getDataAddress, { data: dataAddress }] = useLazyGetAddressQuery()
    const [isWarnDefaultVisible, setIsWarnDefaultVisible] = useState(false)
    const [isWarnSecondaryVisible, setIsWarnSecondaryVisible] = useState(false)
    const [doPurchase] = usePurchaseDataMutation()
    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const [isDefaultAddress, setIsDefaultAddress] = useState(true)

    const [isSecondaryAddress, setIsSecondaryAddress] = useState(false)
    const [getTotalPrice, { data: totalPrice }] = useLazyGetTotalPriceQuery()

    const [dataAddresDefault, setDataAddresDefault] = useState<
        GetAddressProps | undefined
    >()
    const [dataAddresSecondary, setDataAddresSecondary] = useState<
        GetAddressProps | undefined
    >()

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getTotalPrice(csrfToken)
        getDataItems(csrfToken)
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataAddress({ csrfToken })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn, totalPrice])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return

        if (dataAddress && dataAddress[0] && dataAddress[0].isDefault) {
            setDataAddresDefault(dataAddress[0])
        }

        if (dataAddress && dataAddress[1] && dataAddress[1].isDefault) {
            setDataAddresDefault(dataAddress[1])
        }

        if (dataAddress && dataAddress[0] && !dataAddress[0].isDefault) {
            setDataAddresSecondary(dataAddress[0])
        }

        if (dataAddress && dataAddress[1] && !dataAddress[1].isDefault) {
            setDataAddresSecondary(dataAddress[1])
        }
    }, [csrfToken, dataAddress, logado, refreshTokenWarn])

    const handleClick = (isDefault: boolean) => {
        setIsDefaultAddress(isDefault)
        setIsSecondaryAddress(!isDefault)

        if (isDefault) {
            return setIsWarnSecondaryVisible(false)
        } else {
            return setIsWarnDefaultVisible(false)
        }
    }

    const acceptPurchase = (
        dataAddressFunction: GetAddressProps | undefined
    ) => {
        if (data && totalPrice && dataAddressFunction) {
            doPurchase({
                data: {
                    zipCode: dataAddressFunction.zipCode
                        .trim()
                        .replace(/\D/g, ''),
                    complement: dataAddressFunction.complement.trim(),
                    cpf: dataAddressFunction.cpf.trim().replace(/\D/g, ''),
                    name: dataAddressFunction.name.trim(),
                    neighborhood: dataAddressFunction.neighborhood.trim(),
                    number: dataAddressFunction.number.trim(),
                    street: dataAddressFunction.street.trim(),
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
                    totalPrice: totalPrice.totalPrice,
                    isDefault: dataAddressFunction.isDefault
                },
                csrfToken
            })
                .then((res) => {
                    if (res.error) {
                        return new Error(
                            'Algum problema com a geração do qrcode'
                        )
                    }
                    console.log(res)
                    // localStorage.setItem('qrCode', res.data.pixData.imagemQrcode)
                    // localStorage.setItem('copPaste', res.data.pixData.qrcode)
                    // navigate('/pix')
                })
                .catch((err) => console.log(err))
        }
    }

    const handlePurchase = () => {
        if (isDefaultAddress && !dataAddresDefault) {
            return (
                setIsWarnDefaultVisible(true),
                setIsWarnSecondaryVisible(false)
            )
        }

        if (isSecondaryAddress && !dataAddresSecondary)
            return (
                setIsWarnSecondaryVisible(true),
                setIsWarnDefaultVisible(false)
            )

        if (isDefaultAddress && dataAddresDefault) {
            return acceptPurchase(dataAddresDefault)
        }

        if (isSecondaryAddress && dataAddresSecondary) {
            return acceptPurchase(dataAddresSecondary)
        }
    }

    return (
        <>
            <CheckoutContainer>
                <div className="container">
                    <div className="bar-container">
                        <div className="bar" />
                    </div>
                    <h3 className="title-chose-address">Escolha o endereço</h3>
                    <ul className="books-list">
                        {data &&
                            data.items.map(({ id, photo, name, quant }) => (
                                <li key={id}>
                                    <img
                                        className="book-img"
                                        srcSet={photo}
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
                    <ChoseAddress $isChecked={isDefaultAddress}>
                        <li className="address-list">
                            <div>
                                <label>
                                    <div
                                        className="address-list__input-box"
                                        onClick={() => handleClick(true)}
                                    >
                                        <div className="address-list__input-box__ball" />
                                    </div>
                                </label>
                                <ProfileAddress
                                    name={
                                        dataAddresDefault
                                            ? dataAddresDefault.name
                                            : defaultAddress[0].data.name
                                    }
                                    cpf={
                                        dataAddresDefault
                                            ? dataAddresDefault.cpf
                                            : defaultAddress[0].data.cpf
                                    }
                                    cep={
                                        dataAddresDefault
                                            ? dataAddresDefault.zipCode
                                            : defaultAddress[0].data.zipCode
                                    }
                                    complement={
                                        dataAddresDefault
                                            ? dataAddresDefault.complement
                                            : defaultAddress[0].data.complement
                                    }
                                    neighborhood={
                                        dataAddresDefault
                                            ? dataAddresDefault.neighborhood
                                            : defaultAddress[0].data
                                                  .neighborhood
                                    }
                                    number={
                                        dataAddresDefault
                                            ? dataAddresDefault.number
                                            : defaultAddress[0].data.number
                                    }
                                    street={
                                        dataAddresDefault
                                            ? dataAddresDefault.street
                                            : defaultAddress[0].data.street
                                    }
                                    title="Endereço padrão"
                                    isDefault={true}
                                    isSelect={isDefaultAddress}
                                />
                            </div>
                            <ValidAddres
                                className={`${isWarnDefaultVisible ? 'animation-visible' : ''}`}
                            >
                                Insira um endereço válido
                            </ValidAddres>
                        </li>
                    </ChoseAddress>
                    <ChoseAddress $isChecked={isSecondaryAddress}>
                        <li className="address-list">
                            <div>
                                <label>
                                    <div
                                        className="address-list__input-box"
                                        onClick={() => handleClick(false)}
                                    >
                                        <div className="address-list__input-box__ball" />
                                    </div>
                                </label>
                                <ProfileAddress
                                    name={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.name
                                            : defaultAddress[0].data.name
                                    }
                                    cpf={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.cpf
                                            : defaultAddress[0].data.cpf
                                    }
                                    cep={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.zipCode
                                            : defaultAddress[0].data.zipCode
                                    }
                                    complement={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.complement
                                            : defaultAddress[0].data.complement
                                    }
                                    neighborhood={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.neighborhood
                                            : defaultAddress[0].data
                                                  .neighborhood
                                    }
                                    number={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.number
                                            : defaultAddress[0].data.number
                                    }
                                    street={
                                        dataAddresSecondary
                                            ? dataAddresSecondary.street
                                            : defaultAddress[0].data.street
                                    }
                                    title="Endereço secundário"
                                    isDefault={false}
                                    isSelect={isSecondaryAddress}
                                />
                            </div>
                            <ValidAddres
                                className={`${isWarnSecondaryVisible ? 'animation-visible' : ''}`}
                            >
                                Insira um endereço válido
                            </ValidAddres>
                        </li>
                    </ChoseAddress>

                    <div className="button-checkout">
                        <Finish
                            className={`${isWarnDefaultVisible || isWarnSecondaryVisible ? 'error' : ''}`}
                            onClick={handlePurchase}
                        >
                            Finalizar compra
                        </Finish>
                    </div>
                </div>
            </CheckoutContainer>
        </>
    )
}

export default Checkout
