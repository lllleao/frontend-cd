import { useEffect, useState } from 'react'
import { CheckoutContainer, ChoseAddress, ValidAddres } from './styles'

import ProfileAddress from '@/components/AddressCard'
import { Finish } from '@/components/FormAddress/styles'
import { isLoginAndCsrf } from '@/utils'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { GetAddressProps } from '@/interfaces/interfaces'
import {
    useLazyGetAddressQuery,
    useLazyGetItemsCartQuery,
    useLazyGetTotalPriceQuery,
    usePurchaseDataMutation
} from '@/services/api'
import { useProfileData } from '@/hooks/useProfileData'
import useSortAddress from '@/hooks/useSortAddress'
import useRefreshToken from '@/hooks/useRefreshToken'

const Checkout = () => {
    const refresheTokenFunction = useRefreshToken()

    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const sortAddress = useSortAddress()
    const defaultAddress = useProfileData((state) => state.address)

    const [dataAddress, setDataAddress] =
        useState<GetAddressProps[]>(defaultAddress)

    const [getDataItems, { data }] = useLazyGetItemsCartQuery()
    const [getDataAddress] = useLazyGetAddressQuery()
    const [isWarnDefaultVisible, setIsWarnDefaultVisible] = useState(false)
    const [isWarnSecondaryVisible, setIsWarnSecondaryVisible] = useState(false)
    const [doPurchase] = usePurchaseDataMutation()
    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const [isDefaultAddress, setIsDefaultAddress] = useState(true)

    const [isSecondaryAddress, setIsSecondaryAddress] = useState(false)
    const [getTotalPrice, { data: totalPrice }] = useLazyGetTotalPriceQuery()

    const titlesAddress = ['Endereço padrão', 'Endereço secundário']

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getTotalPrice(csrfToken)
        getDataItems(csrfToken)
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataAddress({ csrfToken }).then((res) => {
            setDataAddress(sortAddress(res.data))
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    useEffect(() => {
        console.log(dataAddress, 'lapa')
    }, [dataAddress])

    const handleClick = (isDefault: boolean) => {
        console.log('la')
        setIsDefaultAddress(isDefault)
        setIsSecondaryAddress(!isDefault)

        if (isDefault) {
            return setIsWarnSecondaryVisible(false)
        }
        return setIsWarnDefaultVisible(false)
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
                    totalPrice: Number(totalPrice.totalPrice),
                    isDefault: dataAddressFunction.isDefault
                },
                csrfToken
            })
                .then((res) => {
                    if (res.error) {
                        refresheTokenFunction(res, () => {
                            doPurchase({
                                data: {
                                    zipCode: dataAddressFunction.zipCode
                                        .trim()
                                        .replace(/\D/g, ''),
                                    complement:
                                        dataAddressFunction.complement.trim(),
                                    cpf: dataAddressFunction.cpf
                                        .trim()
                                        .replace(/\D/g, ''),
                                    name: dataAddressFunction.name.trim(),
                                    neighborhood:
                                        dataAddressFunction.neighborhood.trim(),
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
                                    totalPrice: Number(totalPrice.totalPrice),
                                    isDefault: dataAddressFunction.isDefault
                                },
                                csrfToken
                            }).then((response) => {
                                console.log(response)
                            })
                        })
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
        const isDefaultAddressMock = dataAddress[0].street === 'Padrão'
        const isSecondaryAddressMock = dataAddress[1].street === 'Padrão'

        if (isDefaultAddressMock && isDefaultAddress) {
            setIsWarnDefaultVisible(true)
        }

        if (isSecondaryAddressMock && isSecondaryAddress) {
            setIsWarnSecondaryVisible(true)
        }

        if (isDefaultAddress && !isDefaultAddressMock) {
            console.log(dataAddress[0])
            return acceptPurchase(dataAddress[0])
        }

        if (isSecondaryAddress && !isSecondaryAddressMock) {
            return acceptPurchase(dataAddress[1])
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
                    {dataAddress.map(
                        (
                            {
                                complement,
                                cpf,
                                isDefault,
                                name,
                                neighborhood,
                                number,
                                street,
                                zipCode
                            },
                            index
                        ) => (
                            <ChoseAddress
                                key={index}
                                $isChecked={
                                    isDefault
                                        ? isDefaultAddress
                                        : isSecondaryAddress
                                }
                            >
                                <li className="address-list">
                                    <div>
                                        <label>
                                            <div
                                                className="address-list__input-box"
                                                onClick={() =>
                                                    handleClick(isDefault)
                                                }
                                            >
                                                <div className="address-list__input-box__ball" />
                                            </div>
                                        </label>
                                        <ProfileAddress
                                            name={name}
                                            cpf={cpf}
                                            cep={zipCode}
                                            complement={complement}
                                            neighborhood={neighborhood}
                                            number={number}
                                            street={street}
                                            title={titlesAddress[index]}
                                            isDefault={isDefault}
                                            isSelect={
                                                isDefault
                                                    ? isDefaultAddress
                                                    : isSecondaryAddress
                                            }
                                        />
                                    </div>
                                    {isDefault ? (
                                        <ValidAddres
                                            className={`${isWarnDefaultVisible ? 'animation-visible' : ''}`}
                                        >
                                            Insira um endereço válido
                                        </ValidAddres>
                                    ) : (
                                        <ValidAddres
                                            className={`${isWarnSecondaryVisible ? 'animation-visible' : ''}`}
                                        >
                                            Insira um endereço válido
                                        </ValidAddres>
                                    )}
                                </li>
                            </ChoseAddress>
                        )
                    )}

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
