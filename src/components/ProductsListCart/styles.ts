import styled from 'styled-components'
import { ButtonContainer } from '../ButtonPurchase/styles'
import { CardContainer } from '../Card/styles'

export const ProductsListCartContainer = styled.section`
    background-color: #000;
    padding: 5rem 0;

    .no-items {
        margin: auto 0;
        p {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
        }
    }

    .books-list {
        margin-top: 2rem;
        display: flex;
        gap: 3rem;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 300px;

            .img-delete {
                margin-bottom: 1rem;
                img {
                    width: 150px;
                    border-radius: 1rem;
                    border: 2px solid #fff;
                    margin-bottom: 0.5rem;
                }
            }

            .name-text {
                font-weight: bold;
                font-size: 1rem;
                text-align: center;

                @media (max-width: 767px) {
                    width: 90%;
                }
            }

            .total-price {
                .quant {
                    margin-left: 0.5rem;
                    background-color: transparent;
                    font-size: 1.1rem;

                    option {
                        background-color: #000;
                    }
                }
            }

            .fa-trash {
                margin-left: 2rem;
                margin-top: 2rem;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }
        @media (max-width: 790px) {
            flex-wrap: wrap;
            li {
                flex: 1 1 300px;
            }
        }
    }

    .total {
        display: block;
        margin-top: 5rem;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .cards-store-container {
        margin-top: 5rem;
        display: flex;
        justify-content: space-between;
        ${CardContainer} {
            max-width: 250px;
            img {
                width: 80%;
            }
        }
        @media screen and (max-width: 767px) {
            display: block;
            ${CardContainer} {
                margin: 0 auto 2rem;
                text-align: center;

                p {
                    width: 50%;
                    margin: 1rem auto 0;
                }
            }
        }
    }
    h3 {
        font-size: 1.4rem;
    }

    .bar {
        border: 2px solid #fff;
    }

    .title-books-store {
        margin-top: 3rem;
    }
`

export const ItemsOnCart = styled.div`
    margin-bottom: 2rem;

`

export const ButtonCart = styled(ButtonContainer)`
    font-size: 1rem;
    /* display: inline-block;
    text-decoration: none; */
`
