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
                    left: 5%;
                    background-color: #fff;
                }

                &:nth-child(2) {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    background-color: #4b4747;
                }
                
                &:nth-child(3) {
                    position: absolute;
                    top: -30px;
                    left: 90%;
                    background-color: #4b4747;
                }
            }
        }
    }

    .form-checkout {
        .form {
            padding: 2rem;
            display: block;
            margin: 0 auto;
            width: 770px;
            background-color: #222;
            font-weight: bold;

            .cep {
                border: ${({ $errorCEP }) => $errorCEP ? '2px solid red' : ''};
            }
            .cpf {
                border: ${({ $errorCPF }) => $errorCPF ? '2px solid red' : ''};
            }

            &__label {
                /* display: block; */
                margin: 0rem 1rem 0rem;
            }
            &__input {
                /* display: block; */
                padding: 0.3rem;
                border-radius: 8px;
                color: #000;
                outline: none;
                /* border: 2px solid #000; */
                &[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            }

            &__button {
                display: block;
                margin-top: 2rem;
            }

            .name,
            .street {
                width: 300px;
            }

            &__address-container {
                margin-top: 2rem;

                .number-label,
                .neighborhood {
                    display: inline-block;
                    margin-top: 1.5rem;
                }
                .number-input {
                    width: 80px;
                }

                .neighborhood {
                    width: 200px;
                }

                .complement {
                    width: 250px;
                }
            }
        }
    }

    .books-purchase {
        padding: 4rem 0;
        .books-list {
            display: flex;
            justify-content: space-around;
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
        .price-tot {
            margin-top: 2rem;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
`
export const Finish = styled(ButtonContainer)`
    font-size: 1rem;
    display: inline-block;
    text-decoration: none;
`