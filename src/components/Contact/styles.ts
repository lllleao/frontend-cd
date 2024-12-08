import styled from 'styled-components'

export const ContactContainer = styled.section`
    &.contact-us {
        padding-bottom: 122px;

        .button-pix {
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #000;
            padding: 8px;
            border: none;
            cursor: pointer;
            border-radius: 12px;

            svg {
                margin-left: 0.5rem;
            }
        }

        .pix,
        .contact-email {
            background-color: #222;
            max-width: max-content;
            margin: 0 auto;
            padding: 18px;
            border-radius: 12px;
        }

        .pix {
            position: relative;
            z-index: 3;
            text-align: center;
            margin-bottom: 32px;

            h4 {
                font-size: 22px;
            }

            .button-pix {
                font-size: 18px;
                transition:
                    box-shadow 0.3s ease,
                    transform 0.3s ease;

                &:active {
                    box-shadow:
                        0 0 0 0 #4b4b4b,
                        inset 2px 2px 2px #4b4b4b;
                    transform: translate(-2px, 2px);
                    background-color: #000000b9;
                }
            }

            .input-pix {
                text-align: center;
                display: block;
                width: 100%;
                margin: 22px 0;
                padding: 8px;
                background-color: transparent;
                border: none;
                border: 2px solid #eee;
                font-size: 18px;
                border-radius: 12px;

                &--is-copied {
                    color: rgb(33, 190, 33);
                    border: 2px solid rgb(33, 190, 33);
                    animation: copied 1s ease-in;
                }
            }
        }

        .contact-email {
            position: relative;
            background-color: #222;
            max-width: 500px;
            width: 100%;
            margin: 0 auto;
            padding: 34px 18px 18px;
            border-radius: 12px;

            .success {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: -5rem;
                left: 0;
                right: 0;
                margin: 0 1.5rem;
                padding: 0.5rem;
                background-color: rgb(45, 185, 45);
                font-family: sans-serif;
                letter-spacing: 0.3rem;
                border-radius: 0.3rem;
                opacity: 0;
                z-index: 2;
                height: 20%;

                &-is-active {
                    animation: successField 1s ease-out forwards;
                }
            }

            &__form {
                font-size: 22px;

                .text-field {
                    position: relative;

                    &__input,
                    &__textarea {
                        color: #000;
                        padding: 6px;
                        width: 100%;
                        outline: none;
                        resize: none;
                        font-size: 22px;
                        border-radius: 8px;
                        border: 1px solid #fff;

                        &-is-error {
                            border: 1px solid red;
                        }
                    }

                    &__textarea {
                        height: 100px;
                    }

                    &__input {
                        margin-bottom: 34px;
                    }

                    &__label {
                        position: absolute;
                        z-index: 1;
                        top: 8px;
                        left: 8px;
                        display: block;
                        color: #000000c2;
                        pointer-events: none;
                        font-size: 22px;
                        transition:
                            top 0.3s,
                            left 0.3s,
                            color 0.3s;
                    }

                    &__input--empty {
                        .text-field__label {
                            top: -24px;
                            left: 4px;
                            color: #eee;

                            @media (max-width: 767px) {
                                top: -32px;
                            }
                        }
                    }
                }

                .button-contact {
                    margin-top: 16px;
                    font-family: 22px;
                    box-shadow:
                        13px 13px 10px #1c1c1c,
                        -13px -13px 10px #262626;
                    transform: translate(0);
                    font-size: 18px;
                    transition:
                        box-shadow 0.3s ease,
                        transform 0.3s ease,
                        background-color 0.3s ease;

                    &:active {
                        box-shadow: none;
                        transform: translateY(5px);
                    }
                }
            }
        }
    }

    @keyframes copied {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateY(-5px);
        }

        50% {
            transform: translateY(5px);
        }

        75% {
            transform: translateY(-5px);
        }

        95% {
            transform: translateY(5px);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes successFieldBack {
        100% {
            opacity: 0;
            top: -1rem;
        }
    }

    @keyframes successField {
        100% {
            opacity: 1;
            top: 8rem;
        }
    }
`
