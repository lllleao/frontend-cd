import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import Header from '../../containers/Header'
import {
    useGetItemsCartQuery,
    useGetRemoveItemMutation,
    useGetStoreBooksQuery,
    useGetTotalPriceQuery,
    useUpdataPriceMutation
} from '../../services/api'
import { useEffect, useState } from 'react'
import Card from '../Card'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
// import Loader from '../Loader'

const ProductsListCart = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [loading, setLoading] = useState(false)
    const { data, refetch } = useGetItemsCartQuery(csrfToken)
    const { data: totalPrice, refetch: refetchTotalPrice } =
        useGetTotalPriceQuery(csrfToken)
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updataPrice] = useUpdataPriceMutation()
    const { data: booksStore } = useGetStoreBooksQuery()
    const navigate = useNavigate()

    const channelName = 'cart_channel'

    const handleDelete = (id: number | undefined, loading: boolean) => {
        if (id && !loading) {
            deleteCartItem({ id, csrfToken })
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
    }

    const handleChangeOption = (
        element: React.ChangeEvent<HTMLSelectElement>,
        idItem: number | undefined,
        price: number,
        quantBefore: number
    ) => {
        const quant = element.target.value
        setLoading(true)
        updataPrice({
            data: {
                quantBefore,
                quantCurrent: Number(quant),
                idItem,
                price
            },
            csrfToken
        })
            .then(() => {
                refetch().catch((err) => console.log(err))
                setTimeout(refetchTotalPrice, 500)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        console.log(csrfToken)
        refetch()
            .then((res) => {
                if (
                    res.error &&
                    typeof res.error === 'object' &&
                    'data' in res.error &&
                    res.error.data &&
                    typeof res.error.data === 'object' &&
                    'message' in res.error.data
                ) {
                    if (res.error.data.message === 'Token ausente.') {
                        navigate('/login')
                    }
                }
            })
            .catch((err) => console.log(err))
    }, [refetch, navigate, csrfToken])

    const handleClick = () => {
        if (
            totalPrice &&
            !((totalPrice?.totalPrice as unknown as string) === '0')
        ) {
            navigate('/checkout')
        }
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
                                                    disabled={loading}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() =>
                                                        handleDelete(
                                                            id,
                                                            loading
                                                        )
                                                    }
                                                />
                                            </div>
                                        </li>
                                    )
                                )}
                        </ul>
                        <ButtonCart onClick={handleClick}>
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
                                        link={`/store/${id}`}
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
