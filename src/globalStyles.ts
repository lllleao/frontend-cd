import { createGlobalStyle } from 'styled-components'

export const colors = {
    balck: '#000'
}

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #fff;
        list-style: none;
        font-family: 'Courier New OS', Courier, monospace;
    }


    html {
        scroll-behavior: smooth;
    }

    body {
        scrollbar-color: #000;
        &::-webkit-scrollbar {
            color: #000;
        }
        &::-webkit-scrollbar-track {
            background: #000;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #af391b;

        }
    }

    .container {
        max-width: 1216px;
        width: 100%;
        margin: 0 auto;
        padding-bottom: 5rem;
        @media screen and (min-width: 1024px) {
            width: 90%;
        }

        @media (max-width: 1023px) {
            width: 92%;
        }
    }

    .card_container {
        display: flex;
        column-gap: 16px;
        padding-bottom: 122px;
    }

    @keyframes barOne {
        100% {
            left: 100%;
        }
    }

    @keyframes barTwo {
        100% {
            left: -100%;
        }
    }

    @keyframes textErro {
        from {
            opacity: 0;
        } to {
            opacity: 1;
        }
    }
`

export default GlobalStyle
