import styled from 'styled-components'
import { colors } from '../../globalStyles'

export const HeaderContainer = styled.header`
    position: relative;
    z-index: 4;
    background-color: ${colors.balck};
    padding: 2rem 0;
    @media screen and (max-width: 767px) {
        padding: 0;
    }

    /* .cartIcon,
    .userIcon {
        display: none;
    } */
`
