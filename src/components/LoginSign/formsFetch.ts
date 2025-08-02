import { Dispatch, FormEvent } from 'react'
import { UnknownAction } from '@reduxjs/toolkit'
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationActionCreatorResult,
    MutationDefinition
} from '@reduxjs/toolkit/query'
import {
    checkLoginUser,
    checkSignUser,
    EmailUser
} from '../../store/reducers/loginSign'
import { NavigateFunction } from 'react-router-dom'
import { validatePassword } from '../../utils/validationLoginSign'
import { isErrorMessageExist } from '../../utils'
import { DataLoginProp, DataSignupProp } from '../../services/api'

export const handleLogin = (
    event: FormEvent<HTMLFormElement>,
    isEmailValid: boolean,
    password: string,
    data: DataLoginProp,
    dispatch: Dispatch<UnknownAction>,
    makeLogin: (
        arg: DataLoginProp
    ) => MutationActionCreatorResult<
        MutationDefinition<
            DataLoginProp,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            never,
            EmailUser,
            'api'
        >
    >,
    navigate: NavigateFunction,
    fetchCsrfToken: () => Promise<unknown>,
    logout: () => void
) => {
    event.preventDefault()

    if (isEmailValid && password) {
        makeLogin(data)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const errorData = res.error.data as {
                        message?: string
                        error?: string
                    }
                    if (errorData.message === 'Usuário já logado') {
                        console.log(res.error.data.message)
                        dispatch(
                            checkLoginUser({
                                msg: 'Usuário já logado',
                                loginUserExist: true,
                                loginSuccess: false
                            })
                        )
                        return setTimeout(() => {
                            dispatch(
                                checkLoginUser({
                                    loginUserExist: false
                                })
                            )
                            logout()
                        }, 1000)
                    } else if (errorData.message === 'Senha incorreta.') {
                        return dispatch(
                            checkLoginUser({
                                msg: 'Senha Incorreta',
                                loginUserExist: true,
                                loginSuccess: false
                            })
                        )
                    } else if (errorData.message === 'Email não verificado.') {
                        return dispatch(
                            checkLoginUser({
                                msg: 'Email não verificado',
                                loginUserExist: true,
                                loginSuccess: false
                            })
                        )
                    } else if (errorData.message === 'Usuário não existe.') {
                        return dispatch(
                            checkLoginUser({
                                msg: 'Email não existe.',
                                loginUserExist: true,
                                loginSuccess: false
                            })
                        )
                    }
                }
                dispatch(checkLoginUser({ loginUserExist: false }))
                fetchCsrfToken()
                localStorage.setItem('logado', 'true')
                navigate('/')
                return res.data
            })
            .catch((err) => {
                console.error(err)
            })
    }
}

export const handleSign = (
    setIsDisplay: (value: React.SetStateAction<boolean>) => void,
    event: FormEvent<HTMLFormElement>,
    isEmailValid: boolean,
    password: string,
    data: DataSignupProp,
    dispatch: Dispatch<UnknownAction>,
    name: string,
    makeSign: (
        arg: DataSignupProp
    ) => MutationActionCreatorResult<
        MutationDefinition<
            DataSignupProp,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            never,
            EmailUser,
            'api'
        >
    >,
    setIsLoader: (value: React.SetStateAction<boolean>) => void
) => {
    event.preventDefault()

    const regex = /^\s+$/
    const isPasswordCorrect = validatePassword(password)
    setIsDisplay(!isPasswordCorrect)
    console.log(name, isPasswordCorrect, isEmailValid)
    if (name && !regex.test(name) && isEmailValid && isPasswordCorrect) {
        setIsLoader(true)

        makeSign(data)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const errorData = res.error.data as {
                        message?: string
                        error?: string
                    }
                    if (
                        errorData.message ===
                        'CSRF token ausente no cabeçalho da requisição.'
                    ) {
                        setIsLoader(false)

                        return dispatch(
                            checkSignUser({
                                msg: 'Requisição não autorizada',
                                missToken: true,
                                signUserExist: false
                            })
                        )
                    } else if (
                        errorData.error === 'Este email já está em uso.'
                    ) {
                        setIsLoader(false)
                        return dispatch(
                            checkSignUser({
                                msg: errorData.message,
                                signUserExist: true,
                                missToken: false
                            })
                        )
                    }
                }
                setIsLoader(false)
                dispatch(
                    checkSignUser({
                        signUserExist: false,
                        missToken: false,
                        signSuccess: true
                    })
                )
                return res.data
            })
            .catch((err) => {
                console.error(err)
            })
    }
}
