import styled from "styled-components";

export const EmailUserExist = styled.div`
    display: none;
    background-color: #ea4b4b;
    position: absolute;
    padding: 16px;

    @media (max-width: 767px) {
        position: static;
    }

    &.user-exist {
        display: inline-block;
    }
`
