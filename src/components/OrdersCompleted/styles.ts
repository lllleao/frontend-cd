import styled from 'styled-components'
import { CardContainerStore } from '@/componentsCard/styles'

export const OrderItems = styled(CardContainerStore)`
    width: 250px;
    @media screen and (max-width: 767px) {
        display: block;

        img {
            width: 250px;
        }
        h3 {
            width: auto;
        }
    }
    /* width: clamp(150px, 60vw, 250px); */
`
