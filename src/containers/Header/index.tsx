import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { useLazyGetItemsCartQuery } from '../../services/api'
import { HeaderContainer } from './styles'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'

const Header = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [getDataItem, { data }] = useLazyGetItemsCartQuery()
    const [viweNumberCart, setViweNumberCart] = useState(true)
    const [addAnimateCart, setAddAnimateCart] = useState(false)

    useEffect(() => {
        if (csrfToken) {
            getDataItem(csrfToken).then((res) => {
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
        }
    }, [csrfToken, getDataItem])

    return (
        <HeaderContainer>
            <MenuDesktop
                addAnimateCart={addAnimateCart}
                viweNumberCart={viweNumberCart}
                dataLength={data?.items.length}
            />
            <MenuMob
                dataLength={data?.items.length}
                viweNumberCart={viweNumberCart}
            />
        </HeaderContainer>
    )
}

export default Header
