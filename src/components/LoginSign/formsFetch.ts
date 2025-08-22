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
import { LoginErrorMessage } from '../../hooks/useUserLoginResults'
import { SignErrorMessage } from '../../hooks/useUserSignResults'

export const handleLogin = (
    event: FormEvent<HTMLFormElement>,
    isEmailValid: boolean,
    email: string,
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
    errorHandlers: Record<LoginErrorMessage, () => void>
) => {
    event.preventDefault()
    const regex = /^\s+$/
    const isOnlySapce = regex.test(email) || regex.test(password)
    if (isEmailValid && password && !isOnlySapce) {
        makeLogin(data)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const errorData = res.error.data as {
                        message?: string
                        error?: string
                    }
                    console.log(errorData.message)
                    const handler =
                        errorHandlers[errorData.message as LoginErrorMessage]
                    if (handler) return handler()

                    return dispatch(
                        checkLoginUser({
                            msg: 'Erro desconhecido',
                            loginUserExist: true,
                            loginSuccess: false
                        })
                    )
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
    email: string,
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
    setIsLoader: (value: React.SetStateAction<boolean>) => void,
    errorHandlers: Record<SignErrorMessage, () => void>
) => {
    event.preventDefault()

    const regex = /^\s+$/
    const isOnlySapce = regex.test(name) || regex.test(email)

    const isPasswordCorrect = validatePassword(password)
    setIsDisplay(!isPasswordCorrect)

    if (name && !isOnlySapce && isEmailValid && isPasswordCorrect) {
        setIsLoader(true)

        makeSign(data)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const errorData = res.error.data as {
                        message?: string
                        error?: string
                    }
                    const handler =
                        errorHandlers[errorData.message as SignErrorMessage]

                    if (handler) return handler()
                    return dispatch(
                        checkSignUser({
                            msg: 'Erro Desconhecido',
                            signUserExist: true
                        })
                    )
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
