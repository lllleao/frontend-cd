import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
    0% {
        background-position: -450px 0;
    }
    100% {
        background-position: 450px 0;
    }
`

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: min-content;
    max-width: 314px;
    width: 100%;
    .skeleton-img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 100%;
        height: 420px;
        background: #e0e0e0;
        background-image: linear-gradient(
            90deg,
            #9f9f9f 0px,
            #b3b3b3 40px,
            #919090 80px
        );
        background-size: 600px 100%;
        animation: ${shimmer} 1.2s infinite linear;
    }

    .skeleton-title,
    .skeleton-text {
        margin-top: 8px;
        border-radius: 8px;
        width: 80%;
        height: 20px;
        background: #e0e0e0;
        background-image: linear-gradient(
            90deg,
            #9f9f9f 0px,
            #b3b3b3 40px,
            #919090 80px
        );
        background-size: 600px 100%;
        animation: ${shimmer} 1.2s infinite linear;
    }

    .skeleton-text {
        width: 60%;
        height: 16px;
    }

    @media screen and (max-width: 767px) {
        .skeleton-img {
            /* width: clamp(270px, 60vw, 460px); */
        }
        .skeleton-title {
            width: 100%;
        }
    }
`
