import { ButtonLogout, ProfileContainer } from './styles'
import { useEffect } from 'react'
import {
    useLazyGetAddressQuery,
    useLazyGetProfileDataQuery,
    useLazyPurchasePaidQuery
} from '@/services/api'
import OrdersCompleted from '@/components/OrdersCompleted'
import ProfileAddress from '@/components/AddressCard'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import useLogout from '@/hooks/useLogout'
import { useProfileData } from '@/hooks/useProfileData'
import useRefreshToken from '@/hooks/useRefreshToken'
import useSortAddress from '@/hooks/useSortAddress'
import { PurchaseDone } from '@/types/types'
import WitheBar from '../WitheBar'
import SkeletonCard from '../SkeletonCard'

const Profile = () => {
    const refresheTokenFunction = useRefreshToken()
    const sortAddress = useSortAddress()
    const [getPurchasePaid, { data: purchasesPaid, isFetching }] =
        useLazyPurchasePaidQuery()

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

    const [getDataProfile] = useLazyGetProfileDataQuery()
    const logout = useLogout()
    const [getDataAddress] = useLazyGetAddressQuery()

    useEffect(() => {
        if (!csrfToken) return
        getDataProfile(csrfToken).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    getDataProfile(csrfToken).then((response) => {
                        if (response.data) {
                            setProfileNameEmail({
                                email: response.data?.email,
                                name: response.data?.name
                            })
                        }
                    })
                })
            }
            if (res.data) {
                setProfileNameEmail({
                    email: res.data?.email,
                    name: res.data?.name
                })
            }
        })

        getDataAddress({ csrfToken }).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    getDataAddress({ csrfToken }).then((response) => {
                        if (response.isSuccess) {
                            const dataAddress = sortAddress(res.data)
                            setProfileAddress(dataAddress)
                        }
                    })
                })
            }
            if (res.isSuccess) {
                const dataAddress = sortAddress(res.data)
                setProfileAddress(dataAddress)
            }
        })

        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    useEffect(() => {
        if (!csrfToken) return
        getPurchasePaid(csrfToken)
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken])

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
                                zipCode
                            },
                            index
                        ) => (
                            <ProfileAddress
                                key={index}
                                cep={zipCode}
                                complement={complement}
                                cpf={cpf}
                                isDefault={isDefault}
                                name={name}
                                neighborhood={neighborhood}
                                number={number}
                                street={street}
                                title={profileAddressTitle[isDefault ? 0 : 1]}
                            />
                        )
                    )}
                    <ButtonLogout onClick={() => logout('/')}>
                        SAIR
                    </ButtonLogout>
                    <WitheBar />

                    {isFetching ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        <OrdersCompleted
                            data={purchasesPaid as PurchaseDone[]}
                        ></OrdersCompleted>
                    )}
                </div>
            </ProfileContainer>
        </>
    )
}

export default Profile
