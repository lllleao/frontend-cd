import { useNavigate } from 'react-router-dom'
import { ButtonLogout, ProfileContainer, PurchaseCompleted } from './styles'
import { useEffect, useState } from 'react'
import api, {
    GetAddressProps,
    useGetCookieMutation,
    useLazyGetAddressQuery,
    useLazyGetProfileDataQuery,
    useLogoutMutation
} from '../../services/api'
import OrdersCompleted from '../OrdersCompleted'
import Header from '../../containers/Header'
import ProfileAddress from '../AddressCard'
import { defaultAddress, isLoginAndCsrf } from '../../utils'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const Profile = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const profileData = useSelector(
        (state: RootReducer) =>
            api.endpoints.getProfileData.select(csrfToken)(state)?.data
    )

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )
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
        if (!isLoginAndCsrf(logado, csrfToken)) return
        console.log(profileData, 'lasqueira')
        if (profileData) {
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
            return undefined
        }
        getDataProfile(csrfToken)
        getDataAddress({ csrfToken }).then(() => console.log('opa'))

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
        csrfToken,
        dataAddress,
        getDataProfile,
        getDataAddress,
        logado,
        refreshTokenWarn,
        profileData
    ])

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
