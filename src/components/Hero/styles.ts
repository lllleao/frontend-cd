import styled from 'styled-components'

export const HeroContainer = styled.section`
    display: flex;
    align-items: center;
    height: calc(100vh - 107px);

    @media screen and (max-width: 767px) {
        // width: 90%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        min-height: 100svh;
    }

    img {
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
