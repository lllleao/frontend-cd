import styled from "styled-components";
import { ButtonContainer } from "../ButtonPurchase/styles";

export const ProductsListCartContainer = styled.section`
    background-color: #000;
    height: 100vh;
    padding-top: 5rem;

    .no-items {
        margin: auto 0;
        p {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
        }
    }

    ul {
        li {
            margin: 2rem auto 0 auto;
            /* text-align: center; */

            .img-delete {
                margin-bottom: 1rem;
                img {
                    width: 150px;
                    border-radius: 1rem;
                    border: 2px solid #fff;
                    margin-bottom: 0.5rem;
                }
            }

            div {
                font-weight: bold;
                font-size: 1rem;
            }

            .total-price {
                margin-top: 1rem;
                text-align: normal;
            }

            .fa-trash {
                margin-left: 1rem;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }
    }
`

export const ItemsOnCart = styled.div`
    margin-bottom: 2rem;
    h3 {
        font-size: 1.4rem;
    }
    .bar {
        border: 2px solid #fff;
    }
`

export const ButtonCart = styled(ButtonContainer)`
    font-size: 1rem;
`
