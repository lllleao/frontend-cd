import styled from 'styled-components'

export const Documentario = styled.div`
    text-align: center;
    margin-bottom: 3rem;

    .documentario-title {
        margin-top: 2rem;
        font-size: clamp(1rem, 5vw, 2.3rem);
        margin-bottom: 3rem;
    }

    .iframe-doc {
        display: block;
        width: 80%;
        border: 2px solid #e9da21;
        border-radius: 1rem;
        aspect-ratio: 17 / 9;
        margin: 0 auto;
    }
`

export const HeroContainer = styled.section`
    display: flex;
    align-items: center;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        min-height: 100svh;
    }

    .logo3 {
        max-width: 45%;
        @media screen and (max-width: 767px) {
            margin: 0 auto;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: min-content;
        margin-left: 3rem;

        @media screen and (max-width: 767px) {
            margin-top: 10vw;
            margin-left: 44px;
            margin-right: 44px;
        }

        h1 {
            margin-bottom: 8px;
            font-size: clamp(50px, 8vw, 128px);
            line-height: 1em;
            letter-spacing: 8px;
            font-weight: bold;
            text-transform: uppercase;
            -webkit-text-stroke: 0.021875em #fff;
            span {
                font-family: 'Times New Roman', Times, serif;
                color: transparent;
                &:nth-child(1) {
                    padding-left: 12px;
                }
            }
        }

        h2 {
            text-align: center;
            font-size: clamp(22px, 2vw, 64px);
            height: 100px;
            font-family: 'Courier New OS', Courier, monospace;
        }
    }
`
export const AnimationHero = styled.div`
    overflow: hidden;
    .span1 {
        display: block;
        position: relative;

        &::before {
            position: absolute;
            top: 2px;
            left: 12px;
            content: '';
            background-color: #000;
            width: 90%;
            height: 93%;
            animation: barOne 1s 1s ease forwards;
        }
    }

    .span2 {
        display: block;
        position: relative;

        &::before {
            position: absolute;
            top: 2px;
            left: 0;
            content: '';
            background-color: #000;
            width: 99%;
            height: 95%;
            animation: barTwo 1s 2s ease forwards;
        }
    }
`

export const ButtonHero = styled.div`
    margin-top: 2rem;
    ul {
        width: 100%;
        display: grid;
        column-gap: 32px;
        grid-template-areas:
            'instagram github'
            'curriculo curriculo';
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        row-gap: 2rem;
        /* font-weight: bold; */
        text-align: center;
        font-size: 1rem;
        @media (max-width: 399px) {
            grid-template-areas:
                'instagram'
                'github'
                'curriculo';
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
        }
        .primary-button {
            display: block;
            text-decoration: none;
            color: white;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 0.05rem;
            border: 1px solid #0e1822;
            padding: 0.8rem 2.1rem;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E%20.shape%20%7B%20fill:%20%239047E5;%20%7D%20%3C/style%3E%3C/defs%3E%3Cg%20id='Layer_2'%20data-name='Layer%202'%3E%3Cg%20id='Layer_1-2'%20data-name='Layer%201'%3E%3Cpolygon%20class='shape'%20points='415.81%20200%200%20200%20115.47%200%20531.28%200%20415.81%20200'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            background-color: #0e1822;
            background-size: 200%;
            background-position: 200%;
            background-repeat: no-repeat;
            transition: 0.5s ease-in-out;
            transition-property: background-position, border, color;
            position: relative;
            z-index: 1;
            width: 100%;
        }

        .primary-button:hover {
            border: 1px solid #0e1822;
            color: white;
            background-position: 40%;
        }

        .primary-button:before {
            content: '';
            position: absolute;
            background-color: #0e1822;
            width: 0.2rem;
            height: 0.2rem;
            top: -1px;
            left: -1px;
            transition:
                background-color 0.15s ease-in-out,
                width 0.15s ease-in-out,
                height 0.15s ease-in-out;
        }

        .primary-button:hover:before {
            width: 0.5rem;
            height: 0.5rem;
            background-color: #2b0b39;
        }

        .primary-button:hover:after {
            width: 0.5rem;
            height: 0.5rem;
            background-color: #2b0b39;
        }

        .primary-button:after {
            content: '';
            position: absolute;
            background-color: #9047e5;
            width: 0.3rem;
            height: 0.3rem;
            bottom: -1px;
            right: -1px;
            transition:
                background-color 0.15s ease-in-out,
                width 0.15s ease-in-out,
                height 0.15s ease-in-out;
        }

        .button-borders {
            position: relative;
        }

        .button-borders:before {
            content: '';
            position: absolute;
            width: calc(100% + 0.5em);
            height: 50%;
            left: -0.3em;
            top: -0.3em;
            border: 1px solid #fff;
            border-bottom: 0px;
        }

        .button-borders:after {
            content: '';
            position: absolute;
            width: calc(100% + 0.5em);
            height: 50%;
            left: -0.3em;
            bottom: -0.3em;
            border: 1px solid #fff;
            border-top: 0px;
            z-index: 0;
        }

        .shape {
            fill: #0e1822;
        }

        .instagram {
            width: 226px;
        }
    }
`
