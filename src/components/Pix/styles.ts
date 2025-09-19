import styled from 'styled-components'
import { ButtonContainer } from '@/components/ButtonPurchase/styles'

export const PixContainer = styled.div`
    text-align: center;
    padding-top: 6rem;

    .pix-code {
        margin-bottom: 2rem;
        ${ButtonContainer} {
            margin: 2rem auto 0;
            background-color: #222;
            border-color: #41eb66;
        }
    }

    img {
        width: 250px;
    }
    p {
        font-size: 1.6rem;
    }

    ${ButtonContainer} {
        margin: 2rem auto 0;
        background-color: #c92f16;
    }
`
export const ButtonCopyPaste = styled.button<{ $isItemAdd?: boolean }>`
    display: block;
    margin: 2rem auto 0;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${({ $isItemAdd }) =>
        $isItemAdd ? '#6b453e' : '#148d14'};
    padding: 0.5rem 1rem;
    border: none;
    border: 2px solid #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ $isItemAdd }) =>
            $isItemAdd ? '#6b453e' : '#1eb51e'};
    }

    &.not-paid {
        background-color: #da5139ff;
    }

    &.is-fetching {
        background-color: #777372ff;
    }
`
