import { MenuDesktopContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useGetCookieMutation } from '../../services/api'

type MenuProps = {
    viweNumberCart: boolean
    dataLength: number | undefined
    addAnimateCart: boolean
}

const MenuDesktop = ({ viweNumberCart, dataLength, addAnimateCart }: MenuProps) => {

    const [getToken] = useGetCookieMutation()

    const navigate = useNavigate()

    const handleClickUser = () => {
        getToken().then(res => {
            if (res.error) {
                console.error(res.error)

                navigate('/login')
                throw new Error(`HTTP request error`)
            }

            navigate('/profile')
        })
    }

    return (
        <MenuDesktopContainer $addAnimateCart={addAnimateCart} className="container">
            <ul className="nav__list">
                <li className="nav__list__item__desk">
                    <HashLink className={`nav__list__item__desk__link`} to="/#hero">home</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink className={`nav__list__item__desk__link`} to="/#public-lb">biblioteca virtual</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink className={`nav__list__item__desk__link`} to="/#purchase">lojinha</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink className={`nav__list__item__desk__link`} to="/#contact-us">fale conosco</HashLink>
                </li>
                <li className="nav__list__item__desk cartIcon">
                    <a href="/cart" className={`nav__list__item__desk__link`}>
                        <div className={`number-of-items ${viweNumberCart && 'number-of-items--active'}`}>{dataLength}</div>
                        <i className="fa-solid fa-cart-shopping" />
                    </a>

                </li>
                <li className="nav__list__item__desk userIcon">
                    <div onClick={handleClickUser} className={`nav__list__item__desk__link`}>
                        <i className="fa-solid fa-user" />
                    </div>

                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
