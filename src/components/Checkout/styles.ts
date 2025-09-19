import styled from 'styled-components'
import { Finish } from '@/components/FormAddress/styles'

export const CheckoutContainer = styled.div`
    background-color: #000;
    .title-chose-address {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 4rem;
    }

    .fortalcity {
        display: block;
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 3rem;
    }

    .books-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
        text-align: center;
        li {
            max-width: 200px;
            .book-img {
                max-width: 150px;
                border-radius: 1rem;
                border: 2px solid #fff;
                margin-bottom: 0.5rem;
            }

            .book-title {
                h5 {
                    margin-bottom: 1rem;
                }

                p {
                    font-weight: bold;
                }
            }
        }
    }
    .price-tot {
        margin: 4rem 0;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }

    .button-checkout {
        display: flex;
        justify-content: center;
        ${Finish} {
            &.error {
                background-color: #cd1212;
            }
        }
    }
`

export const ChoseAddress = styled.ul<{ $isChecked?: boolean }>`
    .address-list {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 3rem;
        &__input-box {
            position: relative;
            display: flex;
            align-items: center;
            background-color: #3f3f3f;
            width: 60px;
            height: 30px;
            border-radius: 1rem;
            cursor: pointer;
            input {
                /* display: none; */
            }
            &__ball {
                position: absolute;
                left: ${({ $isChecked }) => ($isChecked ? '34px' : '6px')};

                background-color: ${({ $isChecked }) =>
                    $isChecked ? 'red' : '#eee'};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                transition:
                    left 0.5s ease,
                    background-color 0.5s ease;
            }
        }
    }
`
export const ValidAddres = styled.span`
    display: none;
    background-color: #a11818;
    padding: 1rem;
    border-radius: 1rem;
    &.animation-visible {
        display: block;
        animation: textErro 0.5s ease-in-out;
    }
    /* opacity: 0; */
`

// display: ${({ $isWarnVisible }) => $isWarnVisible ? 'block' : 'none'};
