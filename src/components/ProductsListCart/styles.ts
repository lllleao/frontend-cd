import styled from 'styled-components'
import { ButtonContainer } from '@/components/ButtonPurchase/styles'
import { CardContainerStore } from '@/components/Card/styles'
import { SkeletonContainer } from '@/components/SkeletonCard/styles'
import { Container } from '@/components/Loader/styles'

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
                    cursor: pointer;
                    option {
                        background-color: #000;
                    }
                }
                .disabled {
                    cursor: default;
                }
            }

            .fa-trash {
                margin-left: 2rem;
                margin-top: 2rem;
                font-size: 1.5rem;
                cursor: pointer;
            }
            .disabled {
                cursor: default;
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
        .container-skeleton-product-list-books {
            display: block;
            margin: 0 auto;
            width: 90%;
            div {
                display: flex;
                gap: 2rem;
                justify-content: space-between;
                /* flex-wrap: wrap; */
                ${SkeletonContainer} {
                    max-width: 250px;

                    .skeleton-img {
                        height: 320px;
                    }
                }

                @media screen and (max-width: 767px) {
                    flex-direction: column;
                    align-items: center;
                }
            }
        }
        margin-top: 5rem;
        display: flex;
        justify-content: space-between;
        ${CardContainerStore} {
            max-width: 250px;
            img {
                width: 80%;
            }
        }
        @media screen and (max-width: 767px) {
            display: block;
            ${CardContainerStore} {
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

    ${Container} {
        margin: 0;
        display: inline;
    }
`

export const ItemsOnCart = styled.div`
    margin-bottom: 2rem;
    .disabled {
        color: #6f6f6f;
    }
`

export const ButtonCart = styled(ButtonContainer)`
    font-size: 1rem;
    /* display: inline-block;
    text-decoration: none; */
`
