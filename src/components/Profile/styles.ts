import styled from 'styled-components'

export const ProfileContainer = styled.div`
    background-color: #000;
    /* height: calc(100vh - 386px); */

    h2 {
        padding-top: 1rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 1054px) {
        /* height: calc(100vh - 116px); */
    }

    @media (max-width: 767px) {
        /* height: calc(100vh - 52px); */
    }
`
export const ButtonLogout = styled.button`
    background-color: #222;
    padding: 1rem;
    font-size: 1.1rem;
    margin: 1rem 0;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
    &:hover {
        background-color: rgb(103, 100, 100);
    }
`
