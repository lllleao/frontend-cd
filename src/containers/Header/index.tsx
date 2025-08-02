import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { useLazyGetItemsCartQuery } from '../../services/api'
import { HeaderContainer } from './styles'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { useVerifyLogin } from '../../hooks/useVerifyLogin'
import { isLoginAndCsrf } from '../../utils'

const Header = () => {
    const logado = localStorage.getItem('logado')
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const setViweNumberCart = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const [getDataItem, { data }] = useLazyGetItemsCartQuery()

    const [addAnimateCart, setAddAnimateCart] = useState(false)

    useVerifyLogin()
    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataItem(csrfToken)
            .then((res) => {
                if (!res.isSuccess) {
                    return setViweNumberCart(false)
                }
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
        <HeaderContainer>
            <MenuMob dataLength={data?.items.length} />
            <MenuDesktop
                addAnimateCart={addAnimateCart}
                dataLength={data?.items.length}
            />
        </HeaderContainer>
    )
}

export default Header
