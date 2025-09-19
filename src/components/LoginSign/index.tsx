import { useState } from 'react'
import {
    ButtonLoginSign,
    FormContainer,
    LoginSignContainer,
    SignSuccess
} from './styles'
import logo3 from '@/assets/logo-nova/logo3.png'
import Sign from './Sign'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { checkSignUser } from '@/store/reducers/loginSign'
import { RootReducer } from '@/store'

const LoginSign = () => {
    const isLoginScreen = localStorage.getItem('isLoginScreen') as string
    const [loginScreenState, setLoginScreenState] = useState(
        Boolean(isLoginScreen)
    )

    const { signSuccess, missToken } = useSelector(
        (state: RootReducer) => state.loginSigin
    )

    const dispatch = useDispatch()

    const handleChangeLogin = () => {
        localStorage.setItem('isLoginScreen', 'true')
        setLoginScreenState(!loginScreenState)
    }

    const handleChangeSign = () => {
        localStorage.removeItem('isLoginScreen')
        setLoginScreenState(!loginScreenState)
    }

    const handleSign = () => {
        dispatch(
            checkSignUser({
                signSuccess: false
            })
        )
        localStorage.setItem('isLoginScreen', 'true')
        setLoginScreenState(!loginScreenState)
    }

    const handleChangeMob = (loginScreen: boolean) => {
        setLoginScreenState(!loginScreen)
        if (loginScreen) {
            return localStorage.removeItem('isLoginScreen')
        }

        return localStorage.setItem('isLoginScreen', 'true')
    }

    if (signSuccess || missToken) {
        return (
            <>
                <SignSuccess>
                    <div className="container">
                        <p>
                            Cadastro realizado, foi enviado um email de
                            confirmação para sua conta. Após confirmar seu
                            e-mail, basta fazer login normalmente. Verifique
                            também a caixa de span
                        </p>
                        <button type="button" onClick={handleSign}>
                            Fazer login
                        </button>
                    </div>
                </SignSuccess>
            </>
        )
    }

    return (
        <>
            <LoginSignContainer>
                <div className="container">
                    <FormContainer
                        className={`started ${loginScreenState ? 'change' : ''}`}
                    >
                        <div className="logo-container logo-left">
                            <img className="logo3" srcSet={logo3} alt="" />
                            <ButtonLoginSign onClick={handleChangeSign}>
                                Cadastrar
                            </ButtonLoginSign>
                        </div>
                        <Sign />
                        <Login />
                        <div className="logo-container logo-right">
                            <img className="logo3" srcSet={logo3} alt="" />
                            <ButtonLoginSign onClick={handleChangeLogin}>
                                LOGIN
                            </ButtonLoginSign>
                        </div>
                        <div className="text-mobile">
                            <p>
                                {isLoginScreen
                                    ? 'Ainda não tem cadastro?'
                                    : 'Já tem cadastro?'}
                            </p>
                            <ButtonLoginSign
                                onClick={() =>
                                    handleChangeMob(loginScreenState)
                                }
                            >
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
