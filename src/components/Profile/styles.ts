import styled from "styled-components"

export const ProfileContainer = styled.div`
    height: calc(100vh - 162px);
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        margin-bottom: 1rem;
    }

    @media (max-width: 1054px) {
        height: calc(100vh - 116px);
    }

    @media (max-width: 767px) {
        height: calc(100vh - 52px);

    }
`
export const ButtonLogout = styled.button`
    background-color: #222;
    padding: 1rem;
    font-size: 1.1rem;
    margin-top: 4rem;
`
