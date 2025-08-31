import styled from 'styled-components'
import { ButtonContainer } from '@/components/ButtonPurchase/styles'

type CheckoutProps = {
    $errorCEP: boolean
    $errorCPF: boolean
}

export const AddressEditContainer = styled.div`
    background-color: #000;
    padding-bottom: 4rem;
`

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
