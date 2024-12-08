import styled from "styled-components";

export const ButtonContainer = styled.button<{$isItemAdd?: boolean}>`
    display: block;
    margin: 2rem 0 0;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${({$isItemAdd}) => $isItemAdd ? '#c91515' : '#148d14'};
    padding: 0.5rem 1rem;
    border: none;
    border: 2px solid #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({$isItemAdd}) => $isItemAdd ? '#e51717' : '#1eb51e'};
    }
`
