import { useNavigate } from "react-router-dom"
import { ButtonLogout, ProfileContainer } from "./styles"
import { useEffect, useState } from "react"
import { apiUrl } from "../../utils"

export type User = {
    email: string
    id: string
    name: string
}

const Profile = () => {
    const [user, setUser] = useState<User>({
        email: '',
        id: '',
        name: ''
    })
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
        fetch(`${apiUrl}/profile`, {
            method: 'GET',
            credentials: 'include'
        },
        ).then(res => {

            return res.json()

        }).then(res => {
            setUser(res)
        }).catch(err => {
            console.log('caiu aqui')
            console.error(err)
            localStorage.removeItem('loginSuccess')
        })
    }, [])

    return (
        <>
            <ProfileContainer>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>
            </ProfileContainer>
        </>
    )
}

export default Profile
