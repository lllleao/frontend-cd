import { User } from '@/types/types'
import formatDate from '@/utils/formatDate'
// import { OrderItems } from "./styles"

type OrdersCompletedProps = {
    data: User | undefined
}
const OrdersCompleted = ({ data }: OrdersCompletedProps) => {
    return (
        <div className="ordersInfo">
            <ul className="order-list">
                {data?.dataPurchase.map((item, index) => (
                    <li key={index} className="order-list__item">
                        <p className="dateCreate">
                            {formatDate(String(item.createdAt))} - R${' '}
                            {item.totalPrice},00
                        </p>
                        <ul className="list-items-purchase">
                            {item.items.map((orderItems) => (
                                <li
                                    className="list-items-purchase__item"
                                    key={orderItems.name}
                                >
                                    {/* <OrderItems>
                                        <img srcSet={orderItems.photo} />
                                        <h3>{orderItems.name}</h3>
                                        <p>{orderItems.quant} unidade(s)</p>
                                    </OrderItems> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrdersCompleted
