import styled from 'styled-components'

export const ProfileContainer = styled.div`
    background-color: #000;
    /* height: calc(100vh - 386px); */

    h2 {
        padding-top: 1rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 1054px) {
        /* height: calc(100vh - 116px); */
    }

    @media (max-width: 767px) {
        /* height: calc(100vh - 52px); */
    }
`
export const ButtonLogout = styled.button`
    background-color: #222;
    padding: 1rem;
    font-size: 1.1rem;
    margin: 1rem 0;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
    &:hover {
        background-color: rgb(103, 100, 100);
    }
`
export const PurchaseCompleted = styled.div`
    margin-top: 2rem;

    .title-order {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .dateCreate {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .order-list {
        &__item {
            margin-bottom: 3rem;

            .list-items-purchase {
                display: flex;
                gap: 2rem;
                justify-content: space-between;
                @media (max-width: 881px) {
                    flex-direction: column;
                    align-items: center;

                }
            }
        }
    }
`
