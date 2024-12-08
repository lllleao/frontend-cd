import styled from 'styled-components'

export const MenuDesktopContainer = styled.nav<{ $addAnimateCart: boolean }>`
    .nav__list {
        display: flex;
        justify-content: space-between;
        font-size: 1.5em;
        gap: 0.2rem;
        &__item__desk {
            overflow: hidden;
            &__link {
                cursor: pointer;
                display: block;
                letter-spacing: 5px;
                padding: 8px;
                text-decoration: none;
                position: relative;
                z-index: 1;
                border-bottom: 2px solid #d31b1b;
                &::before {
                    content: '';
                    position: absolute;
                    top: -100%;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background-color: #d31b1b;
                    transition: all 0.3s;
                }
                &:hover::before {
                    top: 0;
                }

                &--is-down {
                    &::before {
                        top: 0;
                    }
                }
            }
        }

        @media (min-width: 768px) and (max-width: 870px) {
            justify-content: space-around;
            .nav__item__desk {
                width: min-content;
            }
        }
        @media (max-width: 1054px) {
            display: none;
        }
    }

    .cartIcon {
        .number-of-items {
            display: none;
            padding-left: 5px;
            position: absolute;
            color: #eee;
            background-color: red;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            top: 0;
            left: 20px;

            &--active {
                display: block;
            }
        }
        animation: ${({ $addAnimateCart }) =>
            $addAnimateCart ? 'animateCart 1s linear' : ''};
    }

    @keyframes animateCart {
        0%,
        25%,
        55%,
        85%,
        100% {
            animation-timing-function: ease-out;
            transform: scale(1);
        }
        41%,
        44% {
            animation-timing-function: ease-in;
            transform: scale(1.5);
        }
        70% {
            animation-timing-function: ease-in;
            transform: scale(1.3);
        }
        90% {
            transform: scale(1.1);
        }
    }
`
