import styled from 'styled-components'

export const PurchaseContainer = styled.section`
    padding-top: 32px;
    .purchase__title,
    span {
        text-align: center;
        max-width: 80%;
        margin: 0 auto;
        font-size: clamp(22px, 4vw, 38px);
        font-weight: bold;
        line-height: 48px;
        margin-bottom: 5rem;

        @media (max-width: 1023px) {
            margin-top: 72px;
        }
    }

    span {
        display: block;
        color: #545454;
    }

    .store {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        .container-skeleton-store {
            width: 90%;
            .skeletons-store {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 2rem;
            }
        }
        .card_container__book {
            flex: 0 1 270px;
            -webkit-transform: translateY(20%);
            -webkit-filter: blur(15px);
            -webkit-opacity: 0;
            transform: translateY(20%);
            filter: blur(15px);
            opacity: 0;

            transition: 1s ease;

            @media (max-width: 1023px) {
                transition-delay: 0;

                &:nth-child(2) {
                    transition-delay: 0.5s;
                }

                &:nth-child(3) {
                    transition-delay: 1.5s;
                }
            }
        }
    }

    .store--is-active {
        .card_container__book {
            -webkit-transform: translateY(0);
            -webkit-filter: blur(0);
            -webkit-opacity: 1;
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
            -webkit-transition: 2s ease;
            transition: 2s ease;
            transition-delay: 0.5s;

            &:nth-child(2) {
                transition-delay: 1.5s;
            }

            &:nth-child(3) {
                transition-delay: 2.5s;
            }
        }
    }
`
