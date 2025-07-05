import styled from 'styled-components'
import { ButtonContainer } from '../ButtonPurchase/styles'

type FormProps = {
    $errorCEP: boolean
    $errorCPF: boolean
}

export const TitleForms = styled.h3`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
`

export const BarFormAddress = styled.div`
    padding: 4rem 0;
    /* max-width: 350px; */
    /* display: flex; */
    .bar {
        width: 100%;
        border: solid 2px #db0f0f;
        height: 2px;
        background-color: #db0f0f;
        position: relative;
    }
`

export const FormAddressContainer = styled.div<FormProps>`
    .form {
        padding: 2rem;
        display: block;
        margin: 0 auto;
        max-width: 690px;
        background-color: #222;
        font-weight: bold;
        border-radius: 0.6rem;

        .cep {
            border: ${({ $errorCEP }) => ($errorCEP ? '2px solid red' : '')};
        }
        .cpf {
            border: ${({ $errorCPF }) => ($errorCPF ? '2px solid red' : '')};
        }

        &__label {
            margin-bottom: 0.5rem;
        }

        &__input {
            padding: 0.3rem;
            border-radius: 8px;
            color: #000;
            outline: none;
            width: 100%;
            &[type='number']::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }

        &__button {
            display: block;
            margin-top: 2rem;
        }

        &__address-container {
            margin-top: 2rem;

            .form__label {
                display: block;
            }

            .first-field {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 1rem;

                .text-field-street {
                    flex: 0 1 350px;
                }
                .form__input {
                    width: 100%;
                }
            }

            .second-field {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 1rem;

                .text-field-neighborhood {
                    flex: 0 1 250px;
                }
                .text-field-complement {
                    flex: 0 1 350px;
                }
            }

            .text-field-numberAddress {
                width: 100px;
            }
        }

        &__credentials {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;

            .text-field-name {
                flex: 0 1 350px;
            }

            .form__label {
                display: block;
            }
        }

        @media (max-width: 600px) {
            div {
                margin-bottom: 1rem;
            }
            &__credentials {
                display: block;
            }

            &__address-container {
                .first-field,
                .second-field {
                    display: block;
                }
            }
        }
    }
`

export const Finish = styled(ButtonContainer)`
    font-size: 1rem;
    display: inline-block;
    text-decoration: none;
`
