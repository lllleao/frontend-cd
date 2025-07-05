import { useEffect, useState } from 'react'
import { MenuBobContainer } from './styles'
import { HashLink } from 'react-router-hash-link'
import { useGetCookieMutation } from '../../services/api'

type MenuProps = {
    viweNumberCart: boolean
    dataLength: number | undefined
}

const MenuMob = ({ viweNumberCart, dataLength }: MenuProps) => {
    const csrfToken = localStorage.getItem('csrfToken') as string
    const [isLoginOrProfile, setIsLoginOrProfile] = useState(true)

    const [menuClicked, setMenuClicked] = useState(false)
    const [getToken] = useGetCookieMutation()

    function handleClickCart(): void {
        setMenuClicked(false)
    }

    useEffect(() => {
            getToken(csrfToken)
                .then((res) => {
                    if (res.error) {
                        return setIsLoginOrProfile(true)
                    }

                    // navigate('/profile')
                    setIsLoginOrProfile(false)
                    return res.data
                })
                .catch((err) => console.log(err))
        }, [csrfToken, getToken])

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
                    <a
                        href="/cart"
                        className={`menu-mob__item cartIcon menu-mob__item__cart`}
                        onClick={handleClickCart}
                    >
                        <i className="fa-solid fa-cart-shopping" />{' '}
                        <div
                            className={`number-items-mob ${viweNumberCart ? 'number-items-mob--visible' : ''}`}
                        >
                            {dataLength}
                        </div>
                    </a>
                </li>
                <li>
                    {isLoginOrProfile ? (
                        <a
                        href='/login'
                        className='menu-mob__item userIcon'
                    >
                        <i className="fa-solid fa-right-to-bracket" />
                    </a>
                    ) : (
                        <a
                        href='/profile'
                        className='menu-mob__item userIcon'
                    >
                        <i className="fa-solid fa-user" />
                    </a>
                    )}
                </li>
            </ul>
        </MenuBobContainer>
    )
}

export default MenuMob
