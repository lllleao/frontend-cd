import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import Header from '../../containers/Header'
import {
    useGetRemoveItemMutation,
    useGetStoreBooksQuery,
    useLazyGetItemsCartQuery,
    useLazyGetTotalPriceQuery,
    useRefreshTokenMutation,
    useUpdataPriceMutation
} from '../../services/api'
import { useEffect, useState } from 'react'
import Card from '../Card'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { isErrorMessageExist, isLoginAndCsrf } from '../../utils'

const ProductsListCart = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )
    const [badToken, setBadToken] = useState(false)
    const [loading, setLoading] = useState(false)
    const [getDataItems, { data }] = useLazyGetItemsCartQuery()
    const [getTotalPrice, { data: totalPrice }] = useLazyGetTotalPriceQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updataPrice] = useUpdataPriceMutation()
    const { data: booksStore } = useGetStoreBooksQuery()
    const [getRefresh] = useRefreshTokenMutation()

    const navigate = useNavigate()

    const channelName = 'cart_channel'

    const handleDelete = (id: number | undefined, loading: boolean) => {
        if (id && !loading && csrfToken) {
            deleteCartItem({ id, csrfToken })
                .then((res) => {
                    if (isErrorMessageExist(res)) {
                        const message = res.error.data.message as string
                        if (message === 'Token expirado') {
                            return getRefresh(csrfToken)
                                .then((response) => {
                                    if (response.error) {
                                        localStorage.removeItem('logado')
                                        return navigate('/login')
                                    }
                                    localStorage.setItem('logado', 'true')
                                    deleteCartItem({ id, csrfToken }).then(
                                        () => {
                                            getDataItems(csrfToken).catch(
                                                (err) => console.log(err)
                                            )
                                            setTimeout(
                                                () =>
                                                    getTotalPrice(
                                                        csrfToken
                                                    ).catch((err) =>
                                                        console.log(err)
                                                    ),
                                                500
                                            )
                                        }
                                    )
                                })
                                .catch((error) => {
                                    console.log(error, 'err')
                                })
                        }
                        localStorage.removeItem('logado')
                        return navigate('/login')
                    }
                    getDataItems(csrfToken).catch((err) => console.log(err))
                    setTimeout(
                        () =>
                            getTotalPrice(csrfToken).catch((err) =>
                                console.log(err)
                            ),
                        500
                    )
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
            .then((res) => {
                if (isErrorMessageExist(res)) {
                    const message = res.error.data.message as string
                    if (message === 'Token expirado') {
                        return getRefresh(csrfToken).then((res) => {
                            if (res.error) {
                                return navigate('/login')
                            }

                            updataPrice({
                                data: {
                                    quantBefore,
                                    quantCurrent: Number(quant),
                                    idItem,
                                    price
                                },
                                csrfToken
                            }).then(() => {
                                getDataItems(csrfToken).catch((err) =>
                                    console.log(err)
                                )
                                setTimeout(
                                    () =>
                                        getTotalPrice(csrfToken).catch((err) =>
                                            console.log(err)
                                        ),
                                    500
                                )
                                setLoading(false)
                            })
                        })
                    }
                    return navigate('/login')
                }
                if (csrfToken) {
                    getDataItems(csrfToken).catch((err) => console.log(err))
                    setTimeout(
                        () =>
                            getTotalPrice(csrfToken).catch((err) =>
                                console.log(err)
                            ),
                        500
                    )
                    setLoading(false)
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return

        getTotalPrice(csrfToken).catch((err) => {
            setBadToken(true)
            console.log(err)
        })
        getDataItems(csrfToken).then(() => {
            console.log('é dentro')
        })
    }, [csrfToken, getDataItems, getTotalPrice, logado, refreshTokenWarn])

    const handleClick = () => {
        if (
            totalPrice &&
            !((totalPrice?.totalPrice as unknown as string) === '0') &&
            !badToken
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
                                                    className={`fa-solid fa-trash ${loading ? 'disabled' : ''}`}
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
