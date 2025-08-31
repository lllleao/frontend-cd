import {
    handleBlur,
    handleFocus,
    numberAndCaracterScape
} from '@/utils/contactFunctions'
import { handleValidEmail } from '@/utils/validationLoginSign'
import { ButtonLoginSign } from '../styles'
import { useFormeState } from '@/hooks/useFormState'
import { handleSign } from '../formsFetch'
import { EmailUserExist, WarnPassword } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store'
import { useSignUserMutation } from '@/services/api'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import useUserSignResults from '@/hooks/useUserSignResults'

const Sign = () => {
    const [viewPassword, setViewPassword] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const errorHandlers = useUserSignResults(setIsLoader)
    const { signUserExist, msg } = useSelector(
        (state: RootReducer) => state.loginSigin
    )
    const [makeSign] = useSignUserMutation()
    const dispatch = useDispatch()
    const [isDisplay, setIsDisplay] = useState(false)

    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const {
        emailEmpty,
        email,
        isEmailValid,
        name,
        nameEmpty,
        passwordEmpty,
        password,
        setEmailEmpty,
        setEmail,
        setIsEmailValid,
        setName,
        setNameEmpty,
        setPasswordEmpty,
        setPassword,
        emailBorderError,
        setEmailBorderError
    } = useFormeState()

    const data = {
        data: {
            name: name.trim(),
            email: email.trim(),
            password
        },
        csrfToken
    }

    return (
        <>
            <EmailUserExist className={signUserExist ? 'user-exist' : ''}>
                {msg}
            </EmailUserExist>
            <div className="sign login-sign">
                <div className="login-sign__title">
                    <p>Cadastro</p>
                </div>
                <form
                    className="form"
                    onSubmit={(e) => {
                        handleSign(
                            setIsDisplay,
                            e,
                            isEmailValid,
                            password,
                            data,
                            dispatch,
                            name,
                            email,
                            makeSign,
                            setIsLoader,
                            errorHandlers
                        )
                    }}
                >
                    <div className="form__text-field">
                        <input
                            className="input name"
                            onFocus={(e) => handleFocus(e, setNameEmpty)}
                            onBlur={(e) => handleBlur(e, setNameEmpty)}
                            onChange={(e) =>
                                numberAndCaracterScape(e.target.value, setName)
                            }
                            value={name}
                            type="text"
                            id="name"
                        />
                        <label
                            className={nameEmpty ? 'active' : ''}
                            htmlFor="name"
                        >
                            <i className="fa-solid fa-user" />
                            <span>Nome</span>
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className={`input email ${emailBorderError ? '' : 'sign-email-error'}`}
                            onFocus={(e) => handleFocus(e, setEmailEmpty)}
                            onBlur={(e) => handleBlur(e, setEmailEmpty)}
                            onChange={(e) =>
                                handleValidEmail(
                                    e.target.value,
                                    setEmail,
                                    setIsEmailValid,
                                    setEmailBorderError
                                )
                            }
                            type="email"
                            id="email-sign"
                            value={email}
                        />
                        <label
                            className={emailEmpty ? 'active' : ''}
                            htmlFor="email-sign"
                        >
                            <i className="fa-solid fa-envelope" />
                            <span>Email</span>
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className="input password"
                            onFocus={(e) => handleFocus(e, setPasswordEmpty)}
                            onBlur={(e) => handleBlur(e, setPasswordEmpty)}
                            onChange={(e) => setPassword(e.target.value)}
                            type={viewPassword ? 'text' : 'password'}
                            id="password-sign"
                            value={password}
                        />
                        <label
                            className={passwordEmpty ? 'active' : ''}
                            htmlFor="password-sign"
                        >
                            <i className="fa-solid fa-lock" />
                            <span>Senha</span>
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
                        <WarnPassword $isDisplay={isDisplay}>
                            A senha deve ter pelo menos 8 caracteres, misturando
                            pelo menos números e letras, e não pode ser uma
                            sequência numérica ou alfabética.
                        </WarnPassword>
                    </div>
                    <ButtonLoginSign type="submit">Cadastrar</ButtonLoginSign>
                    {isLoader && <Loader isCircle />}
                </form>
            </div>
        </>
    )
}

export default Sign
