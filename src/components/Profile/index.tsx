import { ButtonLogout, ProfileContainer, PurchaseCompleted } from './styles'
import { useEffect } from 'react'
import {
    useLazyGetAddressQuery,
    useLazyGetProfileDataQuery
} from '../../services/api'
import OrdersCompleted from '../OrdersCompleted'
import ProfileAddress from '../AddressCard'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import useLogout from '../../hooks/useLogout'
import { useProfileData } from '../../hooks/useProfileData'

const Profile = () => {
    const profileAddressTitle = ['Endereço padrão', 'Endereço secundário']
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const setProfileNameEmail = useProfileData(
        (state) => state.setProfileNameEmail
    )
    const setProfileAddress = useProfileData((state) => state.setProfileAddress)
    const nameAndEmail = useProfileData((state) => state.nameAndEmail)
    const address = useProfileData((state) => state.address)

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const [getDataProfile, { data }] = useLazyGetProfileDataQuery()
    const logout = useLogout()
    const [getDataAddress] = useLazyGetAddressQuery()

    useEffect(() => {
        if (!csrfToken) return
        if (address[0].street !== 'Padrão') return
        getDataProfile(csrfToken).then((res) => {
            if (res.data) {
                setProfileNameEmail({
                    email: res.data?.email,
                    name: res.data?.name
                })
            }
        })
        getDataAddress({ csrfToken }).then((res) => {
            console.log(res)
            if (res.isSuccess) {
                setProfileAddress(res.data)
            }
        })

        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    return (
        <>
            <ProfileContainer>
                <div className="container">
                    <h2>{nameAndEmail.name}</h2>
                    <h3>{nameAndEmail.email}</h3>
                    {address.map(
                        (
                            {
                                complement,
                                cpf,
                                isDefault,
                                name,
                                neighborhood,
                                number,
                                street,
                                zipCode,
                                id
                            },
                            index
                        ) => (
                            <ProfileAddress
                                key={id}
                                cep={zipCode}
                                complement={complement}
                                cpf={cpf}
                                isDefault={isDefault}
                                name={name}
                                neighborhood={neighborhood}
                                number={number}
                                street={street}
                                title={profileAddressTitle[index]}
                            />
                        )
                    )}
                    <ButtonLogout onClick={() => logout('/')}>
                        SAIR
                    </ButtonLogout>
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
