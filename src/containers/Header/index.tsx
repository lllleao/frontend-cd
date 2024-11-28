import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { HeaderContainer } from './styles'

const Header = () => {
    return (
        <HeaderContainer>
            <MenuDesktop />
            <MenuMob />
        </HeaderContainer>
    )
}

export default Header
