import { useState } from 'react'
import { MenuBobContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useGetCookieMutation } from '../../services/api'

type MenuProps = {
    viweNumberCart: boolean
    dataLength: number | undefined
}

const MenuMob = ({ viweNumberCart, dataLength }: MenuProps) => {
    const [menuClicked, setMenuClicked] = useState(false)
    const [ getToken ] = useGetCookieMutation()
    const navigate = useNavigate()

    function handleClickCart(): void {
        setMenuClicked(false)
    }

    function handleClickUser() {
        setMenuClicked(false)

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
        <MenuBobContainer>
            <div className={`alert ${viweNumberCart ? 'alert--visible' : ''}`}>!</div>
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
                    <a href="/cart" className={`menu-mob__item cartIcon menu-mob__item__cart`} onClick={handleClickCart}><i className="fa-solid fa-cart-shopping" /> <div className={`number-items-mob ${viweNumberCart ? 'number-items-mob--visible' : ''}`}>{dataLength}</div></a>
                </li>
                <li>
                    <div onClick={handleClickUser} className="menu-mob__item userIcon"><i className="fa-solid fa-user" /></div>
                </li>
            </ul>
        </MenuBobContainer>
    )
}

export default MenuMob
