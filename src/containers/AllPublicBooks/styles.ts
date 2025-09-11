import { CardContainer } from '@/components/Card/styles'
import { ButtonSeeAll } from '@/components/PublicLib/styles'
import { SkeletonContainer } from '@/components/SkeletonCard/styles'
import styled from 'styled-components'

export const AllPublicBooksContainer = styled.section`
    .title-all-projects {
        margin-bottom: 2rem;
    }

    .all-cards-projects {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 2rem;
        gap: 2rem;
    }

    ${SkeletonContainer} {
        max-width: 300px;
    }

    ${CardContainer} {
        max-width: 260px;
    }
`
export const ButtonSeeAllBack = styled(ButtonSeeAll)`
    display: block;
    width: max-content;
    margin: 3rem auto 0;
`
