import styled from 'styled-components'
import { CardContainer } from '@/components/Card/styles'

export const PurchaseCompleted = styled.div`
    margin-top: 2rem;

    .title-order {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .dateCreate {
        font-size: 1.2rem;
        margin: 2rem 0;
        text-align: center;
    }

    .order-list {
        &__item {
            margin: 4rem 0;

            .list-items-purchase {
                display: flex;
                gap: 2rem;
                justify-content: center;
                @media (max-width: 881px) {
                    flex-direction: column;
                    align-items: center;
                }
            }
        }
    }
`

export const OrderItems = styled(CardContainer)`
    width: 250px;
`
