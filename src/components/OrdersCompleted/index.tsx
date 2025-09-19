import { PurchaseDone } from '@/types/types'
import formatDate from '@/utils/formatDate'
import { OrderItems, PurchaseCompleted } from './styles'
import WitheBar from '../WitheBar'

type OrdersCompletedProps = {
    data: PurchaseDone[]
}
const OrdersCompleted = ({ data }: OrdersCompletedProps) => {
    const formatAddress = (addressName: string) => {
        return addressName.replace(/-/g, ' ')
    }
    return (
        <PurchaseCompleted>
            <h4 className="title-order">COMPRAS REALIZADAS</h4>

            <ul className="order-list">
                {data?.map(
                    ({ buyerAddress, createdAt, id, totalPrice, items }) => (
                        <li key={id} className="order-list__item">
                            <p className="dateCreate">
                                {formatDate(String(createdAt))} - R${' '}
                                {totalPrice},00
                            </p>
                            <ul className="list-items-purchase">
                                {items.map(({ name, photo, quant }) => (
                                    <li
                                        className="list-items-purchase__item"
                                        key={name}
                                    >
                                        <OrderItems as="div">
                                            <img srcSet={photo} />
                                            <h3>{name}</h3>
                                            <p>{quant} unidade(s)</p>
                                        </OrderItems>
                                    </li>
                                ))}
                            </ul>
                            <p className="dateCreate">
                                Para: {formatAddress(buyerAddress)}
                            </p>
                            <WitheBar />
                        </li>
                    )
                )}
            </ul>
        </PurchaseCompleted>
    )
}

export default OrdersCompleted
