import { MenuDesktopContainer } from './styles'
import { HashLink } from 'react-router-hash-link'
import { useGetCookieMutation } from '../../services/api'
import { useEffect, useState } from 'react'

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
    const csrfToken = localStorage.getItem('csrfToken') as string
    const [getToken] = useGetCookieMutation()
    const [isLoginOrProfile, setIsLoginOrProfile] = useState(true)

    useEffect(() => {
        getToken(csrfToken)
            .then((res) => {
                if (res.error) {
                    return setIsLoginOrProfile(true)
                }

                setIsLoginOrProfile(false)
                return res.data
            })
            .catch((err) => console.log(err))
    }, [csrfToken, getToken])

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
                    <a href="/cart" className={`nav__list__item__desk__link`}>
                        <div
                            className={`number-of-items ${viweNumberCart && 'number-of-items--active'}`}
                        >
                            {dataLength}
                        </div>
                        <i className="fa-solid fa-cart-shopping" />
                    </a>
                </li>
                <li className="nav__list__item__desk userIcon">
                    {isLoginOrProfile ? (
                        <a
                        href='/login'
                        className={`nav__list__item__desk__link`}
                    >
                        <i className="fa-solid fa-right-to-bracket" />
                    </a>
                    ) : (
                        <a
                        href='/profile'
                        className={`nav__list__item__desk__link`}
                    >
                        <i className="fa-solid fa-user" />
                    </a>
                    )}
                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
