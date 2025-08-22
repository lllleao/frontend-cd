import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { useLazyGetItemsCartQuery } from '../../services/api'
import { HeaderContainer } from './styles'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { useVerifyLogin } from '../../hooks/useVerifyLogin'
import { isLoginAndCsrf, isOnDevelopment } from '../../utils'
import { addItemToCache, getItemFromCache } from '../../utils/cacheConfig'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { updateNumberCart } from '../../store/reducers/cart'

const Header = () => {
    const logado = localStorage.getItem('logado')
    const numberCartCache = getItemFromCache<{
        cache: number
        timeExpiration: number
    }>('numberCart')
    const now = Date.now()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const setViweNumberCart = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const { numberCart } = useSelector((state: RootReducer) => state.cart)
    const dispatch = useDispatch()

    const [getDataItem] = useLazyGetItemsCartQuery()

    const [addAnimateCart, setAddAnimateCart] = useState(false)

    useVerifyLogin()
    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return

        if (numberCartCache && now < numberCartCache.timeExpiration) {
            dispatch(updateNumberCart(numberCartCache.cache))
            return
        }

        getDataItem(csrfToken)
            .then((res) => {
                if (!res.isSuccess) {
                    return setViweNumberCart(false)
                }
                addItemToCache('numberCart', res.data.items.length)
                dispatch(updateNumberCart(res.data.items.length))
                if ((res.data.items.length as number) === 0) {
                    setViweNumberCart(false)
                } else {

                    setViweNumberCart(true)
                    setAddAnimateCart(false)
                    setTimeout(() => {
                        setAddAnimateCart(true)
                    }, 1000)
                }
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    return (
        <HeaderContainer
            className={isOnDevelopment ? '' : 'display-none-development'}
        >
            <MenuMob dataLength={numberCart} />
            <MenuDesktop
                addAnimateCart={addAnimateCart}
                dataLength={numberCart}
            />
        </HeaderContainer>
    )
}

export default Header
