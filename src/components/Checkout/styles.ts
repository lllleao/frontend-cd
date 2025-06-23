import styled from 'styled-components'
import { ButtonContainer } from '../ButtonPurchase/styles'

type CheckoutProps = {
    $errorCEP: boolean
    $errorCPF: boolean
}

export const CheckoutContainer = styled.div<CheckoutProps>`
    background-color: #000;
    .bar-container {
        padding: 7rem 0;
        .bar {
            width: 100%;
            /* border: solid 2px #db0f0f; */
            height: 2px;
            background-color: #db0f0f;
            position: relative;
            .bar-ball {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: #000;
                font-weight: bold;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                &:nth-child(1) {
                    position: absolute;
                    top: -30px;
                    left: 40vw;
                    background-color: #fff;
                }
            }
        }
    }

    .form-checkout {
        .form {
            padding: 2rem;
            display: block;
            margin: 0 auto;
            max-width: 690px;
            background-color: #222;
            font-weight: bold;
            border-radius: 0.6rem;

            .cep {
                border: ${({ $errorCEP }) =>
                    $errorCEP ? '2px solid red' : ''};
            }
            .cpf {
                border: ${({ $errorCPF }) =>
                    $errorCPF ? '2px solid red' : ''};
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

        .price-tot {
            margin-top: 2rem;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
        }
    }

    .books-purchase {
        padding: 4rem 0;
        .books-list {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            gap: 2rem;
            text-align: center;
            li {
                max-width: 200px;
                .book-img {
                    max-width: 150px;
                    border-radius: 1rem;
                    border: 2px solid #fff;
                    margin-bottom: 0.5rem;
                }

                .book-title {
                    h5 {
                        margin-bottom: 1rem;
                    }

                    p {
                        font-weight: bold;
                    }
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
