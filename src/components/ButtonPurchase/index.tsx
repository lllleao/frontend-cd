import { ButtonContainer } from './styles'

type Props = {
    children: string
    addToCart?: () => void
    isItemAdd?: boolean
}

const ButtonPurchase = ({ children, addToCart, isItemAdd }: Props) => {
    return (
        <ButtonContainer $isItemAdd={isItemAdd} onClick={addToCart}>
            {children}
        </ButtonContainer>
    )
}

export default ButtonPurchase
