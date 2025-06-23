import { useNavigate } from 'react-router-dom'
import { ButtonLogout, ProfileContainer, PurchaseCompleted } from './styles'
import { useEffect } from 'react'
import Header from '../../containers/Header'
import {
    useGetCookieMutation,
    useGetProfileDataQuery
} from '../../services/api'
import OrdersCompleted from '../OrdersCompleted'

const Profile = () => {
    const [getToken] = useGetCookieMutation()
    const { data } = useGetProfileDataQuery()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('loginSuccess')

        navigate('/')

        fetch(`http://localhost:9001/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error()
                }
                return res.json()
            })
            .then(() => {})
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getToken()
            .then((res) => {
                if (res.error) {
                    console.error(res.error)

                    navigate('/login')
                    throw new Error(`HTTP request error`)
                }
                console.log(data)
                navigate('/profile')
            })
            .catch((err) => console.log(err))
    }, [getToken, navigate, data])

    return (
        <>
            <Header />
            <ProfileContainer>
                <div className="container">
                    <h2>{data?.name}</h2>
                    <h3>{data?.email}</h3>
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
