import styled from "styled-components";

export const LoginSignContainer = styled.section`
    background-color: #000;

    .container {
        height: calc(100vh - 52px);
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-height: 780px) {
            padding: 2rem 0;
            height: 100%;
        }

        @media (max-width: 930px) {
        }
    }
`
export const FormContainer = styled.div`
    &.started {
        --logo-right: 0;
        --logo-left: -100%;
        --sign-opacity: 1;
        --login-opacity: 0;
        --login-delay: 0s;
        --sign-delay: 0.5s;

        --login-sign-position: absolute;
        --display-logo: block;
        --text-mobile-display: none;
        --display-login: block;
        --display-sign: block;
        @media (max-width: 767px) {
            --display-logo: none;
            --login-sign-position: static;
            --text-mobile-display: block;
            --display-login: none;
        }
    }

    position: relative;
    background-color: #212121;
    width: 1024px;
    height: 700px;
    padding: 2rem;
    overflow: hidden;

    .login-sign {
        position: var(--login-sign-position);
        background-color: #000;
        border-radius: 1rem;
        width: 350px;
        padding: 2rem;
        transition: opacity 0.5s, left 0.5s;
        &__title {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .form {
            &__text-field {
                position: relative;
                margin-bottom: 1.5rem;

                label {
                    display: block;
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    font-size: 1.3rem;
                    z-index: 1;
                    cursor: text;
                    i {
                        margin-right: 0.5rem;
                        color: #000;
                    }

                    span {
                        display: inline-block;
                        opacity: 0.5;
                        color: #000;
                        transition: opacity 0.1s;
                    }

                    &.active {
                        span {
                            display: none;
                        }
                    }
                }

                .input {
                    width: 100%;
                    padding: 0.6rem 0.2rem 0.6rem 2rem;
                    color: #000;
                    outline: none;

                }
                & .sign-email-error,
                & .login-email-error {
                    border: 2px solid red;
                }
            }
        }

        @media (max-width: 767px) {
            max-width: 350px;
            width: 100%;
        }
    }

    .logo-container {
        display: var(--display-logo);
        position: absolute;
        padding: 2rem;
        transition: right 1s, left 1s;
        z-index: 2;
    }

    .login {
        display: var(--display-login);
        top: 25%;
        right: 2rem;
        opacity: var(--login-opacity);
        transition-delay: var(--login-delay);
    }

    .sign {
        display: var(--display-sign);
        top: 25%;
        left: 2rem;
        opacity: var(--sign-opacity);
        transition-delay: var(--sign-delay);
    }

    .logo3 {
        margin-bottom: 2rem;
        width:  420px;
    }

    .logo-right {
        right: var(--logo-right);
        opacity: 1;
    }

    .logo-left {
        left: var(--logo-left);
    }

    &.change {
        --logo-right: -100%;
        --logo-left: 0;
        --login-opacity: 1;
        --sign-opacity: 0;
        --sign-delay: 0s;
        --login-delay: 0.5s;

        @media (max-width: 767px) {
            --display-sign: none;
            --display-login: block;
        }
    }

    .text-mobile {
        display: var(--text-mobile-display);

        p {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }
    }

    @media (min-width: 768px) and (max-width: 930px) {
        .logo3 {
            width: 280px;
        }
    }

    @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
`
export const ButtonLoginSign = styled.button`
    background-color: green;
    border: none;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: block;
    margin: 0 auto;
`
export const SignSuccess = styled.div`
    height: calc(100vh - 160px);
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    button {
        display: block;
        margin: 0 auto;
        background-color: green;
        border: 2px solid #fff;
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
        cursor: pointer;
    }

    @media (max-width: 1054px) {
        height: 100vh;
    }
`
