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
import {
    handleEmailUser,
    handleNameUser,
    handlePassword
} from '@/utils/handlersInput'

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
        email,
        isEmailValid,
        name,
        password,
        setEmail,
        setIsEmailValid,
        setName,
        setPassword,
        emailBorderError,
        setEmailBorderError,
        nameBorderError,
        setNameBorderError,
        setIsNameValid,
        isNameValid,
        isPasswordValid,
        setIsPasswordValid
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
                            isPasswordValid,
                            isNameValid,
                            data,
                            dispatch,
                            makeSign,
                            setIsLoader,
                            errorHandlers
                        )
                    }}
                >
                    <div className="form__text-field">
                        <input
                            className={`input name ${nameBorderError && 'input-error'}`}
                            onChange={(e) =>
                                handleNameUser(
                                    e.target.value,
                                    setName,
                                    setNameBorderError,
                                    setIsNameValid
                                )
                            }
                            value={name}
                            type="text"
                            id="name"
                            placeholder="Nome Completo"
                        />
                        <label htmlFor="name">
                            <i className="fa-solid fa-user" />
                        </label>
                    </div>
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
                            id="email-sign"
                            value={email}
                            placeholder="Email"
                        />
                        <label htmlFor="email-sign">
                            <i className="fa-solid fa-envelope" />
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className="input password"
                            onChange={(e) =>
                                handlePassword(
                                    e.target.value,
                                    setPassword,
                                    setIsPasswordValid
                                )
                            }
                            type={viewPassword ? 'text' : 'password'}
                            id="password-sign"
                            value={password}
                            placeholder="Senha"
                        />
                        <label htmlFor="password-sign">
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
                        <WarnPassword $isDisplay={isDisplay}>
                            A senha deve ter pelo menos 8 caracteres, misturando
                            pelo menos números e letras, e não pode ser uma
                            sequência numérica ou alfabética. E não pode ter
                            ~&lt;&gt;\
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
