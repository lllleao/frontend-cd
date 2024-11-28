import { Dispatch, FormEvent } from "react"
import { UnknownAction } from "@reduxjs/toolkit"
import { loginFetch } from "../../utils/fetchs/login"
import { signFetch } from "../../utils/fetchs/sign"

export type DataProp = {
    name?: string
    email: string
    password: string
}

export const useHandleSubmit = (event: FormEvent<HTMLFormElement>, isEmailValid: boolean, password: string, isLogin: boolean, data: DataProp, dispatch: Dispatch<UnknownAction>, name?: string) => {
    event.preventDefault()

    if (!isLogin) {
        if (name && isEmailValid && password) {
            signFetch(data, dispatch)
        }
    } else {
        if (isEmailValid && password) {
            loginFetch(data, dispatch)
        }
    }
}
