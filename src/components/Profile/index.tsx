import { useNavigate } from 'react-router-dom'
import { ButtonLogout, ProfileContainer, PurchaseCompleted } from './styles'
import { useEffect, useState } from 'react'
import {
    GetAddressProps,
    useGetCookieMutation,
    useLazyGetAddressQuery,
    useLazyGetProfileDataQuery,
    useLogoutMutation,
    useRefreshTokenMutation
} from '../../services/api'
import OrdersCompleted from '../OrdersCompleted'
import Header from '../../containers/Header'
import ProfileAddress from '../ProfileAddress'
import { defaultAddress } from '../../utils'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'

const Profile = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const [getRefresh] = useRefreshTokenMutation()
    const [getToken] = useGetCookieMutation()
    const [getDataProfile, { data }] = useLazyGetProfileDataQuery()
    const [logout] = useLogoutMutation()
    const [getDataAddress, { data: dataAddress }] = useLazyGetAddressQuery()
    const [dataAddresDefault, setDataAddresDefault] = useState<
        GetAddressProps | undefined
    >()
    const [dataAddresSecondary, setDataAddresSecondary] = useState<
        GetAddressProps | undefined
    >()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('loginSuccess')
        logout(csrfToken)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (!csrfToken) return
        console.log(csrfToken, 'entrou')
        getDataProfile(csrfToken)
        getDataAddress({ csrfToken })
        getToken(csrfToken)
            .then((res) => {
                console.log(res)
                if (
                    res.error &&
                    typeof res.error === 'object' &&
                    'data' in res.error &&
                    res.error.data &&
                    typeof res.error.data === 'object' &&
                    'message' in res.error.data
                ) {
                    if (res.error.data.message === 'Token expirado') {
                        getRefresh(csrfToken)
                            .then((response) => {
                                console.log(response, 'aqui')
                                if (response.error) {
                                    return navigate('/login')
                                }
                                localStorage.setItem('logado', 'true')
                                getDataProfile(csrfToken)
                                getDataAddress({ csrfToken })
                            })
                            .catch((error) => {
                                console.log(error, 'err')
                            })
                        return undefined
                    }
                }
                if (res.error || !res.data) {
                    return navigate('/login')
                }

                return res.data
            })
            .catch((err) => console.log(err))
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
    }, [
        getToken,
        navigate,
        csrfToken,
        dataAddress,
        getDataProfile,
        getDataAddress,
        getRefresh
    ])

    return (
        <>
            <Header />
            <ProfileContainer>
                <div className="container">
                    <h2>{data?.name}</h2>
                    <h3>{data?.email}</h3>

                    <ProfileAddress
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

                    <ButtonLogout onClick={handleLogout}>SAIR</ButtonLogout>
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
