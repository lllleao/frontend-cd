import styled from 'styled-components'

export const Container = styled.div<{$isCircle?: boolean}>`
    display: flex;
    justify-content: center;
    margin-bottom: ${({ $isCircle }) => $isCircle ? '0' : '2rem'};
    margin-top: ${({ $isCircle }) => $isCircle ? '2rem' : '0'};
`
