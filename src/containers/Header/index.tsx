import { useEffect, useState } from 'react'
import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import { useGetItemsCartQuery } from '../../services/api'
import { HeaderContainer } from './styles'

const Header = () => {
    const { data, refetch } = useGetItemsCartQuery()
    const [viweNumberCart, setViweNumberCart] = useState(true)
    const [addAnimateCart, setAddAnimateCart] = useState(false)

    useEffect(() => {

        refetch().then((res) => {
            if (!res.isSuccess) {
                return setViweNumberCart(false)
            }
        })
        
        if (!data) {
            setViweNumberCart(false)
        }
        else if (data.items.length as number === 0) {
            setViweNumberCart(false)
        }
        else {
            
            setTimeout(refetch, 1000)
            setViweNumberCart(true)
            setAddAnimateCart(false)
            setTimeout(() => {
                setAddAnimateCart(true)
            }, 1000)
        }
    }, [data])

    return (
        <HeaderContainer>
            <MenuDesktop addAnimateCart={addAnimateCart} viweNumberCart={viweNumberCart} dataLength={data?.items.length} />
            <MenuMob dataLength={data?.items.length} viweNumberCart={viweNumberCart} />
        </HeaderContainer>
    )
}

export default Header
