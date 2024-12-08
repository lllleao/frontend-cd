import styled from "styled-components";
import { CardContainer } from "../Card/styles";

export const BooksPurchase = styled.section<{$isFeching: boolean}>`
    padding: 2rem 0;
    height: ${({$isFeching}) => $isFeching ? '100vh' : 'auto'};
    background-color: #000;
    .book {
        display: flex;
        gap: 5rem;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 2rem;

        @media (max-width: 499px) {
            flex-direction: column;
            align-items: center;
            gap: 0;
        }
    }

    @media (max-width: 1029px) {
        padding: 2rem 0;
        height: auto;
        .book {
            flex-direction: column;
        }
    }
    @media (max-width: 460px) {
        padding: 5rem 0;
    }

    .cards-store-container {
        margin-top: 6rem;
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
                    margin: 1rem auto 0;
                }
            }
        }
    }
`
export const BookImg = styled.div`
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 350px;
    }

    .price-container {
        display: block;
        text-align: center;
        margin-top: 1rem;
        .price {
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            font-weight: bold;
        }

        .quant {
            margin-left: 0.5rem;
            background-color: transparent;
            font-size: 1.1rem;

            option {
                background-color: #000;
            }
        }
    }

    @media (max-width: 1029px) {
        margin: 0 auto;

        img {
            max-width: 350px;
            width: 100%;
        }
    }
`
export const AboutBook = styled.div<{ $isSeeMore: boolean }>`
    h3 {
        font-size: clamp(1rem, 4vw, 1.7rem);
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }

    .sinopse-title {
        font-weight: bold;
    }
    .sinopse {
        text-align: justify;
        font-size: clamp(1.2rem, 2vw, 1.5rem);
        line-height: 2rem;

        &__view {

            &__part {
                display: none;
            }
        }

        @media (max-width: 1029px) {
            margin-bottom: 2rem;
        }

        @media (max-width: 767px) {
            margin-bottom: 2rem;

            &__view {
                &__all {
                    display: none;
                }
                &__part {
                    display: inline;

                    .see-more {
                        text-align: center;
                        padding: 8px;
                        display: ${({ $isSeeMore }) => $isSeeMore ? 'block' : 'none'};
                        cursor: pointer;
                    }
                }
        }
        }
    }

    .others-informations {
        margin-top: 0.5rem;
        font-size: clamp(1rem, 2vw, 1.2rem);
        ul {
            li {
                margin-top: 1rem;
            }
        }

        @media (max-width: 425px) {
            text-align: center;
        }
    }

    .tags {
        font-weight: bold;
        margin-top: 1rem;
        text-align: center;
        font-size: clamp(1rem, 2vw, 1.2rem);
    }
`
