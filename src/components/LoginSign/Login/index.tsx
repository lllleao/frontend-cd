import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '../formsFetch'
import { ButtonLoginSign } from '../styles'
import { useFormeState } from '@/hooks/useFormState'
import { RootReducer } from '@/store'
import { EmailUserMsgContainer } from './styles'
import { useLoginUserMutation } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import useUserLoginResults from '@/hooks/useUserLoginResults'
import { useState } from 'react'
import { handleEmailUser, handlePassword } from '@/utils/handlersInput'
import { DataLoginProp } from '@/interfaces/interfaces'
import useLogout from '@/hooks/useLogout'

const Login = () => {
    const logout = useLogout()
    const setLogged = useCsrfTokenStore((state) => state.setLogged)

    const [viewPassword, setViewPassword] = useState(false)
    const errorHandlers = useUserLoginResults()
    const { loginUserExist, msg } = useSelector(
        (state: RootReducer) => state.loginSigin
    )
    const fetchCsrfToken = useCsrfTokenStore((state) => state.fetchCsrfToken)

    const [makeLogin] = useLoginUserMutation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const {
        email,
        isEmailValid,
        password,
        setEmail,
        setIsEmailValid,
        setPassword,
        emailBorderError,
        setEmailBorderError,
        isPasswordValid,
        setIsPasswordValid
    } = useFormeState()

    const data: DataLoginProp = {
        data: {
            email: email.trim(),
            password: password
        },
        csrfToken
    }

    return (
        <>
            <EmailUserMsgContainer>
                <p className={`emailUserMsg ${loginUserExist ? 'user' : ''}`}>
                    {msg}
                </p>
            </EmailUserMsgContainer>
            <div className="login login-sign">
                <div className="login-sign__title">
                    <p>Login</p>
                </div>
                <form
                    className="form"
                    onSubmit={(e) =>
                        handleLogin(
                            e,
                            isEmailValid,
                            isPasswordValid,
                            data,
                            dispatch,
                            makeLogin,
                            navigate,
                            fetchCsrfToken,
                            errorHandlers,
                            logout,
                            setLogged
                        )
                    }
                >
                    <div className="form__text-field">
                        <input
                            className={`input email ${emailBorderError && 'input-error'}`}
                            onChange={(e) =>
                                handleEmailUser(
                                    e.target.value,
                                    setEmail,
                                    setEmailBorderError,
                                    setIsEmailValid
                                )
                            }
                            type="email"
                            id="email-login"
                            value={email}
                            placeholder="Email"
                        />
                        <label htmlFor="email-login">
                            <i className="fa-solid fa-envelope" />
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className="input password"
                            type={viewPassword ? 'text' : 'password'}
                            onChange={(e) =>
                                handlePassword(
                                    e.target.value,
                                    setPassword,
                                    setIsPasswordValid
                                )
                            }
                            id="password-login"
                            value={password}
                            placeholder="Senha"
                        />
                        <label htmlFor="password-login">
                            <i className="fa-solid fa-lock" />
                        </label>
                        {viewPassword ? (
                            <i
                                onClick={() => setViewPassword(!viewPassword)}
                                className="fa-solid fa-eye-slash eye-password"
                            />
                        ) : (
                            <i
                                onClick={() => setViewPassword(!viewPassword)}
                                className="fa-solid fa-eye eye-password"
                            />
                        )}
                    </div>
                    <ButtonLoginSign type="submit">Login</ButtonLoginSign>
                </form>
            </div>
        </>
    )
}

export default Login
