import { apiUrl } from ".."
import { User } from "../../components/Profile"

export const profileInfo = (setUser: (value: React.SetStateAction<User>) => void) => {
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
}
