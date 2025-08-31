import { useEffect, useState } from 'react'
import { MenuBobContainer } from './styles'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'

type MenuProps = {
    dataLength: number | undefined
}

const MenuMob = ({ dataLength }: MenuProps) => {
    const viweNumberCart = useCsrfTokenStore((state) => state.viweNumberCart)
    const setViweNumberCar = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const logado = localStorage.getItem('logado')
    const [menuClicked, setMenuClicked] = useState(false)

    function handleClickCart(): void {
        setMenuClicked(false)
    }

    useEffect(() => {
        if (!dataLength && !(dataLength === 0)) return
        if (dataLength === 0) {
            setViweNumberCar(false)
        } else {
            setViweNumberCar(true)
        }
    }, [dataLength, setViweNumberCar])

    return (
        <MenuBobContainer>
            <div className={`alert ${viweNumberCart ? 'alert--visible' : ''}`}>
                !
            </div>
            <div
                className={`hamburguer-wrapper ${menuClicked ? 'hamburguer-wrapper__is-active-menu' : ''}`}
                onClick={() => setMenuClicked(!menuClicked)}
            >
                <span className="hamburguer-wrapper__item"></span>
                <span className="hamburguer-wrapper__item"></span>
                <span className="hamburguer-wrapper__item"></span>
            </div>
            <ul
                className={`menu-mob ${menuClicked ? 'menu-mob__is-active-menu' : ''}`}
            >
                <li>
                    <HashLink to="/#hero" className="menu-mob__item">
                        home
                    </HashLink>
                </li>
                <li>
                    <HashLink to="/#public-lb" className="menu-mob__item">
                        biblioteca virtual
                    </HashLink>
                </li>
                <li>
                    <HashLink className="menu-mob__item" to="/#purchase">
                        lojinha
                    </HashLink>
                </li>
                <li>
                    <HashLink className="menu-mob__item" to="/#contact-us">
                        fale conosco
                    </HashLink>
                </li>
                <li>
                    {logado ? (
                        <Link
                            to={logado ? '/cart' : '/login'}
                            className="menu-mob__item cartIcon menu-mob__item__cart"
                            onClick={handleClickCart}
                        >
                            <i className="fa-solid fa-cart-shopping" />{' '}
                            <div
                                className={`number-items-mob ${viweNumberCart ? 'number-items-mob--visible' : ''}`}
                            >
                                {dataLength}
                            </div>
                        </Link>
                    ) : (
                        <></>
                    )}
                </li>
                <li>
                    {!logado ? (
                        <>
                            <Link
                                to="/login"
                                className="menu-mob__item userIcon"
                            >
                                <i className="fa-solid fa-right-to-bracket" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                className="menu-mob__item userIcon"
                            >
                                <i className="fa-solid fa-user" />
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </MenuBobContainer>
    )
}

export default MenuMob
