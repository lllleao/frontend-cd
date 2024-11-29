import { Dispatch, FormEvent } from "react"
import { UnknownAction } from "@reduxjs/toolkit"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationActionCreatorResult, MutationDefinition } from "@reduxjs/toolkit/query"
import { checkLoginUser, checkSignUser, EmailUser } from "../../store/reducers/loginSign"
import { NavigateFunction } from "react-router-dom"

export type DataProp = {
    name?: string
    email: string
    password: string
}

export const useHandleLogin = (event: FormEvent<HTMLFormElement>, isEmailValid: boolean, password: string, data: DataProp, dispatch: Dispatch<UnknownAction>, makeLogin: (arg: DataProp) => MutationActionCreatorResult<MutationDefinition<DataProp, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, EmailUser, "api">>, navigate: NavigateFunction) => {
    event.preventDefault()

    if (isEmailValid && password) {
        makeLogin(data).then( res => {
            if (res.error) {
                console.error(res.error)
                throw new Error('Login falhou.')
            }
            dispatch(checkLoginUser(res.data))
            if (res.data.loginSuccess) {
                navigate('/')
            }
        }).catch(err => {
            dispatch(checkLoginUser({msg: 'Email incorreto', loginUserExist: true, passWordCorrect: false, loginSuccess: false}))
            console.error(err)
        })
    }
}

export const useHandleSign = (event: FormEvent<HTMLFormElement>, isEmailValid: boolean, password: string, data: DataProp, dispatch: Dispatch<UnknownAction>, name: string, makeSign: (arg: DataProp) => MutationActionCreatorResult<MutationDefinition<DataProp, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, EmailUser, "api">>) => {
    event.preventDefault()

    if (name && isEmailValid && password) {
        makeSign(data).then(res => {
            if (res.error) {
                console.error(res.error)
                throw new Error('Cadastro falhou.')
            }
            dispatch(checkSignUser(res.data))
        }).catch(err => {
            dispatch(checkSignUser({msg: data.email, signUserExist: true}))
            console.error(err)
        })
    }
}
