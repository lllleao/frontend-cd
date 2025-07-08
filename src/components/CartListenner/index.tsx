import { useEffect } from 'react'
import { useLazyGetItemsCartQuery } from '../../services/api'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'

const CartListenner = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [getDataItem] = useLazyGetItemsCartQuery()

    const channelName = 'cart_channel'
    useEffect(() => {
        const channel = new BroadcastChannel(channelName)

        channel.onmessage = (event) => {
            if (event.data.type === 'UPDATE_COUNT' && csrfToken) {
                setTimeout(() => getDataItem(csrfToken), 1000)
            }
        }

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            channel.close
        }
    }, [csrfToken, getDataItem])
    return null
}

export default CartListenner
