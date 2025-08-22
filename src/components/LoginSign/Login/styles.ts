import styled from 'styled-components'

export const EmailUserMsgContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .emailUserMsg {
        display: none;
        background-color: #ea4b4b;
        padding: 8px;
        text-align: center;

        &.user {
            display: block;
        }

        &.password {
            display: block;
        }
    }

    @media (max-width: 767px) {
        position: static;
    }
`
