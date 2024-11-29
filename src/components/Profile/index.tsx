import { useNavigate } from "react-router-dom"
import { ButtonLogout, ProfileContainer } from "./styles"
import { useEffect } from "react"
import { apiUrl } from "../../utils"
import Header from "../../containers/Header"
import { useGetCookieMutation, useGetProfileDataQuery } from "../../services/api"

export type User = {
    email: string
    id: string
    name: string
}

const Profile = () => {
    const [getToken] = useGetCookieMutation()
    const { data } = useGetProfileDataQuery()
    
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('loginSuccess')
        navigate('/')

        fetch(`${apiUrl}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        },
        ).then(res => {
            if (!res.ok) {
                throw new Error
            }

            return res.json()
        }).then(res => {
            res
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        getToken().then(res => {
            if (res.error) {
                console.error(res.error)

                navigate('/login')
                throw new Error(`HTTP request error`)
            }

            navigate('/profile')
        })
    }, [])

    return (
        <>
            <Header />
            <ProfileContainer>
                <h1>{data?.name}</h1>
                <h2>{data?.email}</h2>
                <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>
            </ProfileContainer>
        </>
    )
}

export default Profile
