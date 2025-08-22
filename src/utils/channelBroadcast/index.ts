export const channelBroadcast = (numberCart: number) => {
    const channelName = 'cart_channel'

    const channel = new BroadcastChannel(channelName)
    channel.postMessage({
        type: 'UPDATE_COUNT',
        value: numberCart
    })
}
