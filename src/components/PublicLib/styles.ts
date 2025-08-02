import styled from 'styled-components'

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

        .cursor {
            position: relative;
            .mask-left,
            .mask-right {
                display: none;
            }

            @media (max-width: 767px) {
                .mask-left,
                .mask-right {
                    display: block;
                }
            }
        }
    }
`

export const Carrossel = styled.div`
    .cloned {
        display: none;
    }

    &.carroussel {
        @media (min-width: 768px) {
            width: 90%;
            display: grid;
            grid-template-columns: repeat(2, minmax(250px, 0.3fr));
            place-content: center;
            row-gap: 3rem;
            column-gap: 3rem;
            margin: 0 auto;
        }
        &::before,
        &::after {
            display: none;
        }

        @media (max-width: 767px) {
            position: relative;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 16px;

            &::before {
                display: block;
                content: '';
                position: absolute;
                background: linear-gradient(
                    90deg,
                    #000000ee,
                    #000000a4,
                    #00000075,
                    #00000000
                );
                top: 0;
                left: 0;
                height: 100%;
                width: 15%;
                z-index: 1;
            }

            &::after {
                display: block;
                content: '';
                position: absolute;
                background: linear-gradient(
                    90deg,
                    #00000000,
                    #00000075,
                    #000000a4,
                    #000000ee
                );
                top: 0;
                right: 0;
                width: 15%;
                height: 100%;
            }

            .cloned {
                display: block;
            }
        }
    }
`
