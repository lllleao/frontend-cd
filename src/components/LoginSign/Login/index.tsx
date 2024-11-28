import { useDispatch, useSelector } from "react-redux"
import { handleBlur, handleFocus } from "../../../utils/contactFunctions"
import { handleValidEmail } from "../../../utils/validationLoginSign"
import { useHandleSubmit } from "../formsFetch"
import { ButtonLoginSign } from "../styles"
import { useFormeState } from "../useFormState"
import { RootReducer } from "../../../store"
import { EmailUserMsgContainer } from "./styles"
import { Navigate } from "react-router-dom"

const Login = () => {
    const { loginUserExist, passWordCorrect } = useSelector((state: RootReducer) => state.loginSigin)
    const loginSuccess = localStorage.getItem('loginSuccess')

    const dispatch = useDispatch()

    const { emailEmpty,
        email,
        isEmailValid,
        passwordEmpty,
        password,
        setEmailEmpty,
        setEmail,
        setIsEmailValid,
        setPasswordEmpty,
        setPassword,
        emailBorderError,
        setEmailBorderError
    } = useFormeState()

    const data = {
        email,
        password
    }

    if (loginSuccess) {
        return <Navigate to="/" />
    }

    return (
        <>
            <EmailUserMsgContainer>
                <p className={`emailUserMsg ${loginUserExist ? 'user' : ''}`}>
                    Email não encontrado
                </p>
                <p className={`emailUserMsg ${passWordCorrect ? 'password' : ''}`}>
                    Senha incorreta
                </p>
            </EmailUserMsgContainer>
            <div className="login login-sign">
                <div className="login-sign__title">
                    <p>Login</p>
                </div>
                <form className="form" onSubmit={(e) => useHandleSubmit(e, isEmailValid, password, true, data, dispatch)}>
                    <div className="form__text-field">
                        <input
                            className={`input email ${emailBorderError ? '' : 'login-email-error'}`}
                            onFocus={(e) => handleFocus(e, setEmailEmpty)}
                            onBlur={(e) => handleBlur(e, setEmailEmpty)}
                            onChange={(e) => handleValidEmail(e.target.value, setEmail, setIsEmailValid, setEmailBorderError)}
                            type="email"
                            id="email-login"
                            value={email}
                        />
                        <label className={emailEmpty ? 'active' : ''} htmlFor="email-login">
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
                            type="password"
                            id="password-login"
                            value={password}
                        />
                        <label className={passwordEmpty ? 'active' : ''} htmlFor="password-login">
                            <i className="fa-solid fa-lock" />
                            <span>Senha</span>
                        </label>
                    </div>
                    <ButtonLoginSign type="submit">Login</ButtonLoginSign>
                </form>
            </div>
        </>
    )
}

export default Login
