import { MenuDesktopContainer } from './styles'
import { HashLink } from 'react-router-hash-link'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'

type MenuProps = {
    dataLength: number | undefined
    addAnimateCart: boolean
}

const MenuDesktop = ({ dataLength, addAnimateCart }: MenuProps) => {
    const logado = localStorage.getItem('logado')
    const iconLoginProfileRef = useRef<HTMLLIElement>(null)
    const viweNumberCart = useCsrfTokenStore((state) => state.viweNumberCart)

    return (
        <MenuDesktopContainer
            $addAnimateCart={addAnimateCart}
            className="container"
        >
            <ul className="nav__list">
                <li className="nav__list__item__desk">
                    <HashLink
                        className={`nav__list__item__desk__link`}
                        to="/#hero"
                    >
                        home
                    </HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink
                        className={`nav__list__item__desk__link`}
                        to="/#public-lb"
                    >
                        biblioteca virtual
                    </HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink
                        className={`nav__list__item__desk__link`}
                        to="/#purchase"
                    >
                        lojinha
                    </HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink
                        className={`nav__list__item__desk__link`}
                        to="/#contact-us"
                    >
                        fale conosco
                    </HashLink>
                </li>
                <li className="nav__list__item__desk cartIcon">
                    {logado ? (
                        <Link
                            to={logado ? '/cart' : '/login'}
                            className={`nav__list__item__desk__link`}
                        >
                            <div
                                className={`number-of-items ${viweNumberCart && 'number-of-items--active'}`}
                            >
                                {dataLength}
                            </div>
                            <i className="fa-solid fa-cart-shopping" />
                        </Link>
                    ) : (
                        <></>
                    )}
                </li>
                <li
                    className="nav__list__item__desk userIcon"
                    ref={iconLoginProfileRef}
                >
                    {!logado ? (
                        <>
                            <Link
                                to="/login"
                                className={`nav__list__item__desk__link`}
                            >
                                <i className="fa-solid fa-right-to-bracket" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                className={`nav__list__item__desk__link`}
                            >
                                <i className="fa-solid fa-user" />
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
