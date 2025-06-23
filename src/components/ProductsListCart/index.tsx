/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import Header from '../../containers/Header'
import {
    useGetItemsCartQuery,
    useGetRemoveItemMutation,
    useGetStoreBooksQuery,
    useGetTotalPriceQuery,
    useUpdataPriceMutation
} from '../../services/api'
import { useEffect } from 'react'
import Card from '../Card'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const ProductsListCart = () => {
    const { data, refetch, isLoading } = useGetItemsCartQuery()
    const { data: totalPrice, refetch: refetchTotalPrice } =
        useGetTotalPriceQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updataPrice] = useUpdataPriceMutation()
    const { data: booksStore } = useGetStoreBooksQuery()
    const navigate = useNavigate()

    const channelName = 'cart_channel'

    const handleDelete = (name: string | undefined) => {
        console.log(name)
        name &&
            deleteCartItem(name)
                .unwrap()
                .then(() => {
                    refetch().catch((err) => console.log(err))
                    setTimeout(refetchTotalPrice, 500)

                    console.log('Item removido do carrinho com sucesso')
                })
                .catch((error) => console.error('Erro ao remover item:', error))
        const channel = new BroadcastChannel(channelName)
        channel.postMessage({ type: 'UPDATE_COUNT', value: 'opa' })
        channel.close()
    }

    const handleChangeOption = (
        element: React.ChangeEvent<HTMLSelectElement>,
        idItem: number | undefined,
        price: number,
        quantBefore: number
    ) => {
        const quant = element.target.value
        updataPrice({
            quantBefore,
            quantCurrent: Number(quant),
            idItem,
            price
        })
            .then(() => {
                refetch().catch((err) => console.log(err))
                setTimeout(refetchTotalPrice, 500)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        refetch()
            .then((res) => {
                if (res.error && 'status' in res.error) {
                    if (res.error.status === 401) {
                        navigate('/login')
                    }
                }
            })
            .catch((err) => console.log(err))
    }, [refetch, navigate])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Header />
            <ProductsListCartContainer>
                <div className="container">
                    <ItemsOnCart>
                        <h3>ITENS NO CARRINHO</h3>
                        <div className="bar" />
                        <ul className="books-list">
                            {data &&
                                data.items.map(
                                    ({ id, photo, price, name, quant }) => (
                                        <li key={id}>
                                            <div className="img-delete">
                                                <img
                                                    src={photo}
                                                    alt="item cart"
                                                />
                                            </div>
                                            <div className="name-text">
                                                {quant} x {name}
                                            </div>
                                            <div className="total-price">
                                                Valor: R$ {price},00
                                                <select
                                                    onChange={(e) =>
                                                        handleChangeOption(
                                                            e,
                                                            id,
                                                            price,
                                                            quant
                                                        )
                                                    }
                                                    className="quant"
                                                    name="quant"
                                                    value={quant}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() =>
                                                        handleDelete(name)
                                                    }
                                                />
                                            </div>
                                        </li>
                                    )
                                )}
                        </ul>
                        <ButtonCart as="a" href="/checkout">
                            Comprar Agora
                        </ButtonCart>
                    </ItemsOnCart>
                    <span className="total">
                        Preço total: R$ {totalPrice?.totalPrice}
                    </span>
                    <h3 className="title-books-store">COMPRE TAMBÉM</h3>
                    <div className="bar" />
                    <div className="cards-store-container">
                        {booksStore &&
                            booksStore.map(
                                ({ descBooks, id, photo, title, price }) => (
                                    <Card
                                        type
                                        key={id}
                                        descBooks={descBooks}
                                        price={price}
                                        link={`/store-books/${id}`}
                                        photo={photo}
                                        title={title}
                                    />
                                )
                            )}
                    </div>
                </div>
            </ProductsListCartContainer>
        </>
    )
}

export default ProductsListCart
