import { MenuDesktopContainer } from './styles'
import { HashLink } from 'react-router-hash-link'
import { useGetCookieMutation } from '../../services/api'
import { useEffect, useRef } from 'react'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { Link } from 'react-router-dom'

type MenuProps = {
    viweNumberCart: boolean
    dataLength: number | undefined
    addAnimateCart: boolean
}

const MenuDesktop = ({
    viweNumberCart,
    dataLength,
    addAnimateCart
}: MenuProps) => {
    const [getToken] = useGetCookieMutation()
    const logado = localStorage.getItem('logado')
    const iconLoginProfileRef = useRef<HTMLLIElement>(null)
    const { csrfToken } = useCsrfTokenStore((state) => state)

    useEffect(() => {
        if (!csrfToken) return

        getToken(csrfToken)
            .then((res) => {
                if (res.error || !res.data) {
                    return localStorage.removeItem('logado')
                }
                localStorage.setItem('logado', 'true')

                return res.data
            })
            .catch((err) => console.log(err))
    }, [logado, csrfToken, getToken])

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
                    <Link
                        to={logado ? '/cart' : '/login' }
                        className={`nav__list__item__desk__link`}
                    >
                        <div
                            className={`number-of-items ${viweNumberCart && 'number-of-items--active'}`}
                        >
                            {dataLength}
                        </div>
                        <i className="fa-solid fa-cart-shopping" />
                    </Link>
                    {/* <a href="/cart" className={`nav__list__item__desk__link`}>
                        <div
                            className={`number-of-items ${viweNumberCart && 'number-of-items--active'}`}
                        >
                            {dataLength}
                        </div>
                        <i className="fa-solid fa-cart-shopping" />
                    </a> */}
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
                            {/* <a
                                href="/login"
                                className={`nav__list__item__desk__link`}
                            >
                                <i className="fa-solid fa-right-to-bracket" />
                            </a> */}
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                className={`nav__list__item__desk__link`}

                            >
                                <i className="fa-solid fa-user" />
                            </Link>
                            {/* <a
                                href="/profile"
                                className={`nav__list__item__desk__link`}
                            >
                                <i className="fa-solid fa-user" />
                            </a> */}
                        </>
                    )}
                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
