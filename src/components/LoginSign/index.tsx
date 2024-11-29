import { useState } from "react"
import { ButtonLoginSign, FormContainer, LoginSignContainer, SignSuccess } from "./styles"
import logo3 from '../../assets/logo-nova/logo3.png'
import Sign from "./Sign"
import Login from "./Login"
import { useDispatch, useSelector } from "react-redux"
import { checkLoginUser, checkSignUser } from "../../store/reducers/loginSign"
import { RootReducer } from "../../store"
import Header from "../../containers/Header"

const LoginSign = () => {
    const isLoginScreen = localStorage.getItem('isLoginScreen')
    const [loginScreenState, setLoginScreenState] = useState(Boolean(isLoginScreen))

    const { signSuccess } = useSelector((state: RootReducer) => state.loginSigin)

    const dispatch = useDispatch()

    const handleChangeLogin = () => {
        dispatch(checkSignUser({ signUserExist: false }))
        localStorage.setItem('isLoginScreen', 'true')
        setLoginScreenState(!loginScreenState)
    }

    const handleChangeSign = () => {
        dispatch(checkLoginUser({ loginUserExist: false, passWordCorrect: false }))
        localStorage.removeItem('isLoginScreen')
        setLoginScreenState(!loginScreenState)
    }

    const handleSign = () => {
        dispatch(checkSignUser({
            signSuccess: false
        }))
        localStorage.setItem('isLoginScreen', 'true')
        setLoginScreenState(!loginScreenState)
    }

    if (signSuccess) {
        return (
            <>
                <Header />
                <SignSuccess>
                    <div className="container">
                        <p>Cadastro realizado, foi enviado um email de confirmação para sua conta. Após confirmar seu e-mail, basta fazer login normalmente</p>
                        <button type="button" onClick={handleSign}>Fazer login</button>
                    </div>
                </SignSuccess>
            </>
        )
    }

    return (
        <>
            <Header />
            <LoginSignContainer>
                <div className="container">
                    <FormContainer className={`started ${loginScreenState ? 'change' : ''}`}>
                        <div className="logo-container logo-left">
                            <img className="logo3" srcSet={logo3} alt="" />
                            <ButtonLoginSign onClick={handleChangeSign}>Cadastrar</ButtonLoginSign>
                        </div>
                        <Sign />
                        <Login />
                        <div className="logo-container logo-right">
                            <img className="logo3" srcSet={logo3} alt="" />
                            <ButtonLoginSign onClick={handleChangeLogin}>LOGIN</ButtonLoginSign>
                        </div>
                        <div className="text-mobile">
                            <p>
                                {isLoginScreen ? 'Ainda não tem cadastro?' : 'Já tem cadastro?'}
                            </p>
                            <ButtonLoginSign onClick={() => setLoginScreenState(!loginScreenState)}>
                                {loginScreenState ? 'Cadastro' : 'Login'}
                            </ButtonLoginSign>
                        </div>
                    </FormContainer>
                </div>
            </LoginSignContainer>
        </>
    )
}

export default LoginSign
