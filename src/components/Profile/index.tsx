import { ButtonLogout, ProfileContainer, PurchaseCompleted } from './styles'
import { useEffect, useState } from 'react'
import {
    GetAddressProps,
    useLazyGetAddressQuery,
    useLazyGetProfileDataQuery
} from '../../services/api'
import OrdersCompleted from '../OrdersCompleted'
import Header from '../../containers/Header'
import ProfileAddress from '../AddressCard'
import { defaultAddress, isLoginAndCsrf } from '../../utils'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import useLogout from '../../hooks/useLogout'

const Profile = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const [getDataProfile, { data }] = useLazyGetProfileDataQuery()
    const logout = useLogout()
    const [getDataAddress, { data: dataAddress }] = useLazyGetAddressQuery()
    const [dataAddresDefault, setDataAddresDefault] = useState<
        GetAddressProps | undefined
    >()
    const [dataAddresSecondary, setDataAddresSecondary] = useState<
        GetAddressProps | undefined
    >()

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataProfile(csrfToken)
        getDataAddress({ csrfToken })

        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    useEffect(() => {
        if (!dataAddress) return
        const dataAddresDefault = dataAddress.find((addr) => addr.isDefault)
        const dataAddresSecondary = dataAddress.find((addr) => !addr.isDefault)

        if (dataAddresDefault) setDataAddresDefault(dataAddresDefault)
        if (dataAddresSecondary) setDataAddresSecondary(dataAddresSecondary)
    }, [dataAddress])

    return (
        <>
            <Header />
            <ProfileContainer>
                <div className="container">
                    <h2>{data?.name}</h2>
                    <h3>{data?.email}</h3>

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
                                : defaultAddress[0].data.neighborhood
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
                        isSelect={false}
                    />

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
                                : defaultAddress[0].data.neighborhood
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
                        isSelect={false}
                    />

                    <ButtonLogout onClick={() => logout('/')}>SAIR</ButtonLogout>
                    <PurchaseCompleted>
                        <h4 className="title-order">COMPRAS REALIZADAS</h4>
                        <OrdersCompleted data={data} />
                    </PurchaseCompleted>
                </div>
            </ProfileContainer>
        </>
    )
}

export default Profile
