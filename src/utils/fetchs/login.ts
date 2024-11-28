import { UnknownAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { apiUrl } from ".."
import { DataProp } from "../../components/LoginSign/formsFetch"
import { checkLoginUser } from "../../store/reducers/loginSign"

export const loginFetch = (data: DataProp, dispatch: Dispatch<UnknownAction>) => {
    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }).then(res => {
        if (!res.ok) {
            throw new Error('Login falhou.')
        }
        return res.json()
    }).then(res => {
        localStorage.setItem('loginSuccess', 'true')
        dispatch(checkLoginUser(res))
    }).catch((err) => {
        dispatch(checkLoginUser({msg: 'Email incorreto', loginUserExist: true, passWordCorrect: false, loginSuccess: false}))
        console.error(err)
    })
}
