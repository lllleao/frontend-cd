import { useEffect } from 'react'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { addItemToCache } from '@/utils/cacheConfig'
import { useDispatch } from 'react-redux'
import { updateNumberCart } from '@/store/reducers/cart'

const CartListenner = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const dispatch = useDispatch()

    const channelName = 'cart_channel'
    useEffect(() => {
        const channel = new BroadcastChannel(channelName)

        channel.onmessage = (event) => {
            if (event.data.type === 'UPDATE_COUNT' && csrfToken) {
                dispatch(updateNumberCart(event.data.value))
                addItemToCache('numberCart', event.data.value)
            }
        }

        return () => channel.close()
    }, [csrfToken, dispatch])
    return null
}

export default CartListenner
