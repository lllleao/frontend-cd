import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { GetBooksCart, useGetItemsCartQuery } from '../../services/api'
import { HeaderContainer } from './styles'

const Header = () => {
    const csrfToken = localStorage.getItem('csrfToken') as string
    const { data, refetch } = useGetItemsCartQuery(csrfToken)
    const [dataSecond, setDataSecond] = useState<GetBooksCart>()
    const [viweNumberCart, setViweNumberCart] = useState(true)
    const [addAnimateCart, setAddAnimateCart] = useState(false)

    useEffect(() => {
        refetch()
            .then((res) => {
                if (!res.isSuccess) {
                    return setViweNumberCart(false)
                }
                return setDataSecond(res.data)
            })
            .catch((err) => console.log(err))

        if (!data && !dataSecond) {
            setViweNumberCart(false)
        } else if ((data?.items.length as number) === 0 && (dataSecond?.items.length as number) === 0) {
            setViweNumberCart(false)
        } else {
            setTimeout(refetch, 1000)
            setViweNumberCart(true)
            setAddAnimateCart(false)
            setTimeout(() => {
                setAddAnimateCart(true)
            }, 1000)
        }
    }, [data, dataSecond, refetch])

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
