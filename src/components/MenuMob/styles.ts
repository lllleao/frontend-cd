import styled from 'styled-components'

export const MenuBobContainer = styled.nav`
    .hamburguer-wrapper {
        background-color: #000;
        display: none;
        z-index: 2;
        padding: 8px;
        cursor: pointer;
        position: fixed;
        top: 20px;
        right: 20px;
        &__item {
            display: block;
            width: 28px;
            height: 5px;
            background-color: #fff;
            border-radius: 50px;
            transition: all 0.3s;

            &:nth-child(2) {
                margin: 5px 0;
            }
        }

        &__is-active-menu {
            .hamburguer-wrapper__item {
                &:nth-child(1) {
                    transform: rotate(-45deg) translate(-8px, 8px);
                }
                &:nth-child(2) {
                    transform: rotate(-45deg) translate(-1px, 1px);
                }
                &:nth-child(3) {
                    transform: rotate(45deg) translate(-6px, -6px);
                }
            }
        }
        @media (max-width: 1054px) {
            display: block;
        }
    }

    .alert {
        display: none;
        position: fixed;
        top: 15px;
        right: 20px;
        background-color: red;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        font-size: 1.05rem;
        font-weight: bold;
        text-align: center;
        z-index: 3;
        &--visible {
            display: block;
            @media (min-width: 1055px) {
                display: none;
            }
        }
    }
    .menu-mob {
        z-index: 2;
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #222;
        width: min-content;
        padding: 16px;
        opacity: 0;
        -webkit-transform: translateX(120%);
        transform: translateX(120%);
        -webkit-transition:
            opacity 0.3s 0.1s,
            transform 0.3s ease-in-out;
        transition:
            opacity 0.3s 0.1s,
            transform 0.3s ease-in-out;
        &__item {
            text-decoration: none;
            display: block;
            margin-bottom: 8px;
            padding: 6px;
        }

        &__item__cart {
            display: flex;
            justify-content: space-between;

            .number-items-mob {
                display: none;
                background-color: red;
                width: 20px;
                height: 20px;
                border-radius: 50px;
                font-size: 1.05rem;
                font-weight: bold;
                text-align: center;
                &--visible {
                    display: block;
                }
            }
        }

        &__is-active-menu {
            -webkit-transform: translate(-50px, 10px);
            display: block;
            transform: translate(-50px, 10px);
            opacity: 1;
        }
        @media (min-width: 1055px) {
            display: none;
        }
    }
`
