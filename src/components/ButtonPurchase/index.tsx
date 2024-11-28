import { ButtonContainer } from "./styles"

type Props = {
    children: string
    addToCart?: () => void
}

const ButtonPurchase = ({children, addToCart}: Props) => {
    return (
        <ButtonContainer onClick={addToCart}>{children}</ButtonContainer>
    )
}

export default ButtonPurchase
