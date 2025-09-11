import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CardContainerStore = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: min-content;
    transition: transform 0.3s;
    width: 90%;
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 100%;
    }

    h3,
    p {
        text-align: center;
        margin-top: 8px;
        text-decoration: none;
        font-size: clamp(18px, 4vw, 20px);
        font-weight: bold;
        width: 80%;
    }
`
export const CardContainer = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: min-content;
    transition: transform 0.3s;
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 100%;
    }

    h3,
    p {
        text-align: center;
        margin-top: 8px;
        text-decoration: none;
        font-size: clamp(18px, 4vw, 20px);
        font-weight: bold;
        width: 80%;
    }

    @media screen and (max-width: 767px) {
        img {
            max-width: 270px;
        }
        h3 {
            width: 100%;
        }
    }
`
