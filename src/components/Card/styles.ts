import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CardContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: min-content;
    transition: transform 0.3s;
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 100%;
    }

    h3, p {
        text-align: center;
        margin-top: 8px;
        text-decoration: none;
        font-size: clamp(18px, 4vw, 20px);
        font-weight: bold;
        width: 80%;
    }

    @media screen and (max-width: 767px) {
        display: block;

        img {
            width: clamp(270px, 60vw, 460px);
        }
        h3 {
            width: 100%;
        }
    }
`
