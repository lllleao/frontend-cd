import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import {
    useGetRemoveItemMutation,
    useLazyGetItemsCartQuery,
    useLazyGetStoreBooksQuery,
    useLazyGetTotalPriceQuery,
    useRefreshTokenMutation,
    useUpdatePriceMutation
} from '../../services/api'
import { useEffect, useState } from 'react'
import Card from '../Card'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { isErrorMessageExist, isLoginAndCsrf } from '../../utils'
import { getItemFromCache, verifyIfIsCached } from '../../utils/cacheConfig'
import SkeletonCard from '../SkeletonCard'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import useLogout from '../../hooks/useLogout'
import { channelBroadcast } from '../../utils/channelBroadcast'
import Loader from '../Loader'

const ProductsListCart = () => {
    const booksFromLocal = getItemFromCache<{
        cache: BooksFromStore[]
        timeExpiration: number
    }>('booksStore')

    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const logout = useLogout()

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )
    const { numberCart } = useSelector((state: RootReducer) => state.cart)

    const [loading, setLoading] = useState(false)
    const [getDataItems, { data }] = useLazyGetItemsCartQuery()
    const [getTotalPrice, { data: totalPrice, isFetching }] =
        useLazyGetTotalPriceQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updatePrice] = useUpdatePriceMutation()
    const [getStoreBooks] = useLazyGetStoreBooksQuery()
    const [getRefresh] = useRefreshTokenMutation()

    const [booksStore, setBooksStore] = useState<BooksFromStore[]>()

    const navigate = useNavigate()

    const handleDelete = (id: number | undefined, loading: boolean) => {
        setLoading(true)

        if (id && !loading && csrfToken) {
            deleteCartItem({ id, csrfToken })
                .then((res) => {
                    if (isErrorMessageExist(res)) {
                        const message = res.error.data.message as string
                        if (message === 'Token expirado') {
                            return getRefresh(csrfToken)
                                .then((response) => {
                                    if (response.error) {
                                        logout('/')
                                        return
                                    }
                                    localStorage.setItem('logado', 'true')
                                    deleteCartItem({ id, csrfToken }).then(
                                        () => {
                                            getDataItems(csrfToken).catch(
                                                (err) => console.log(err)
                                            )
                                            channelBroadcast(numberCart - 1)
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
                        logout('/')
                        return
                    }
                    setLoading(false)

                    getDataItems(csrfToken).catch((err) => console.log(err))
                    channelBroadcast(numberCart - 1)
                    setTimeout(
                        () =>
                            getTotalPrice(csrfToken).catch((err) =>
                                console.log(err)
                            ),
                        500
                    )
                })
                .catch((error) => console.error('Erro ao remover item:', error))
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
        updatePrice({
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
                                logout('/')
                                return
                            }

                            updatePrice({
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
                    } else {
                        logout('/')
                        return
                    }
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
        verifyIfIsCached(
            booksFromLocal,
            setBooksStore,
            getStoreBooks,
            'booksStore'
        )
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getStoreBooks, refreshTokenWarn])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return

        getTotalPrice(csrfToken)
        getDataItems(csrfToken)
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    const handleClick = () => {
        getTotalPrice(csrfToken).then((res) => {
            console.log(res)
            if (res.isError) {
                return logout('/')
            }

            navigate('/checkout')
        })
    }

    return (
        <>
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
                                                    srcSet={photo}
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
                                                    className={`quant ${loading ? 'disabled' : ''}`}
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
                        {data && data.items.length > 0 ? (
                            <ButtonCart onClick={handleClick}>
                                Comprar Agora
                            </ButtonCart>
                        ) : (
                            <></>
                        )}
                    </ItemsOnCart>
                    <span className="total">
                        Preço total: R${' '}
                        {isFetching ? (
                            <Loader isCircle />
                        ) : (
                            totalPrice?.totalPrice
                        )}
                    </span>

                    <h3 className="title-books-store">COMPRE TAMBÉM</h3>
                    <div className="bar" />
                    <div className="cards-store-container">
                        {booksStore ? (
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
                            )
                        ) : (
                            <div className="container-skeleton-product-list-books">
                                <div>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ProductsListCartContainer>
        </>
    )
}

export default ProductsListCart
