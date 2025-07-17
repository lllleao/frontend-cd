import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import {
    useGetCookieMutation,
    useLazyGetItemsCartQuery,
    useRefreshTokenMutation
} from '../../services/api'
import { HeaderContainer } from './styles'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { isErrorMessageExist, isLoginAndCsrf } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const setViweNumberCart = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const setRefreshTokenWarn = useCsrfTokenStore(
        (state) => state.setRefreshTokenWarn
    )
    const [getDataItem, { data }] = useLazyGetItemsCartQuery()
    const [getToken] = useGetCookieMutation()
    const [getRefresh] = useRefreshTokenMutation()

    const [addAnimateCart, setAddAnimateCart] = useState(false)
    const logado = localStorage.getItem('logado')

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getToken(csrfToken)
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const message = res.error.data.message
                    if (message === 'Token expirado') {
                        getRefresh(csrfToken)
                            .then((response) => {
                                if (response.error) {
                                    localStorage.removeItem('logado')
                                    return navigate('/login')
                                }
                                setRefreshTokenWarn(true).finally(() => setRefreshTokenWarn(false))
                                localStorage.setItem('logado', 'true')
                                getDataItem(csrfToken)
                                    .then((res) => {
                                        if (!res.isSuccess) {
                                            return setViweNumberCart(false)
                                        }
                                        if (
                                            (res.data.items
                                                .length as number) === 0
                                        ) {
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
                            })
                            .catch((error) => {
                                console.log(error, 'err')
                            })
                        return undefined
                    } else {
                        console.log(res)
                        localStorage.removeItem('logado')
                        return navigate('/login')
                    }
                }
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
                localStorage.setItem('logado', 'true')
            })
            .catch((err) => console.log(err))
    }, [logado, csrfToken, getToken, getRefresh, getDataItem, navigate, setViweNumberCart, setRefreshTokenWarn])

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
