import { SkeletonContainer } from "./styles"

const SkeletonCard = ({isDisplayNoneMobile}: {isDisplayNoneMobile?: boolean}) => (
    <SkeletonContainer className={isDisplayNoneMobile ? 'display-none-mobile' : ''}>
        <div className="skeleton-img" />
        <div className="skeleton-title" />
        <div className="skeleton-text" />
    </SkeletonContainer>
)

export default SkeletonCard
