import styled from 'styled-components'
import { ButtonContainer } from '../ButtonPurchase/styles'

export const PublicLibContainer = styled.section`
    padding-top: 32px;
    padding-bottom: 122px;

    .container-skeleton-public {
        margin: 0 auto;
        .skeletons-public {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* 2 colunas iguais */
            gap: 3rem;
            place-items: center;
            @media (max-width: 767px) {
                display: flex;
                justify-content: center;
                .display-none-mobile {
                    display: none;
                }
            }
        }
    }

    & .public-lb {
        &__title {
            text-align: center;
            margin: 0 auto 128px;
            width: 100%;
            font-family: 'Medula One', system-ui;
            font-size: clamp(64px, 10vw, 160px);
            font-weight: normal;

            filter: drop-shadow(0em 0em 0.017405em rgba(247, 7, 7, 0.95))
                drop-shadow(0em 0em 0.087025em rgba(247, 38, 38, 0.75))
                drop-shadow(0em 0em 0.261075em rgba(247, 38, 38, 0.44))
                drop-shadow(0em 0em 0.017405em rgba(247, 7, 7, 0.95));

            color: #fd9c9c;

            @media (max-width: 767px) {
                margin: 0 auto 32px;
            }
        }
    }
    .all-books {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
        .card_lib_pub {
            flex: 0 1 300px;
        }
    }
`
export const NavPageBooks = styled.nav`
    display: flex;
    justify-content: center;
    gap: 3rem;

    .button-nav-page {
        background-color: green;
    }
`

export const ButtonNavPage = styled(ButtonContainer)`
    &.is-disabled {
        background-color: grey;
    }

    @media screen and (max-width: 767px) {
        display: none;
    }
`
export const NavPageAllBooks = styled.nav`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`
export const ButtonSeeAll = styled(ButtonContainer)`
    display: inline-block;
    text-decoration: none;

    @media screen and (min-width: 768px) {
        display: none;
    }
`
