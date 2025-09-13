import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import {
    useGetRemoveItemMutation,
    useLazyGetItemsCartQuery,
    useLazyGetStoreBooksQuery,
    useLazyGetTotalPriceQuery,
    useUpdatePriceMutation
} from '@/services/api'
import { useEffect, useState } from 'react'
import Card from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { isLoginAndCsrf } from '@/utils'
import { getItemFromCache, verifyIfIsCached } from '@/utils/cacheConfig'
import SkeletonCard from '@/components/SkeletonCard'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store'
import useLogout from '@/hooks/useLogout'
import { channelBroadcast } from '@/utils/channelBroadcast'
import Loader from '@/components/Loader'
import useRefreshToken from '@/hooks/useRefreshToken'

const ProductsListCart = () => {
    const refresheTokenFunction = useRefreshToken()
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

    const setRefreshTokenWarn = useCsrfTokenStore(
        (state) => state.setRefreshTokenWarn
    )

    const { numberCart } = useSelector((state: RootReducer) => state.cart)

    const [loading, setLoading] = useState(false)
    const [getDataItems, { data }] = useLazyGetItemsCartQuery()
    const [getTotalPrice, { data: totalPrice, isFetching }] =
        useLazyGetTotalPriceQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updatePrice] = useUpdatePriceMutation()
    const [getStoreBooks] = useLazyGetStoreBooksQuery()

    const [booksStore, setBooksStore] = useState<BooksFromStore[]>()

    const navigate = useNavigate()

    const handleDoPurchase = () => {
        getTotalPrice(csrfToken).then((res) => {
            console.log(res)
            if (res.error) {
                return logout('/')
            }
            if (res.data) {
                if (res.data.totalPrice && res.data.totalPrice !== '0') {
                    navigate('/checkout')
                }
            }
        })
    }

    const handleDelete = (id: number | undefined, loading: boolean) => {
        setLoading(true)

        if (id && !loading && csrfToken) {
            deleteCartItem({ id, csrfToken })
                .then((res) => {
                    if (res.error) {
                        return refresheTokenFunction(res, () => {
                            deleteCartItem({ id, csrfToken }).then(() => {
                                setLoading(false)
                                channelBroadcast(numberCart - 1)
                                setRefreshTokenWarn(true).finally(() =>
                                    setRefreshTokenWarn(false)
                                )
                                setTimeout(
                                    () =>
                                        getTotalPrice(csrfToken).catch((err) =>
                                            console.log(err)
                                        ),
                                    500
                                )
                            })
                        })
                    }
                    setLoading(false)
                    channelBroadcast(numberCart - 1)
                    setRefreshTokenWarn(true).finally(() =>
                        setRefreshTokenWarn(false)
                    )
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
                if (res.error) {
                    return refresheTokenFunction(res, () => {
                        updatePrice({
                            data: {
                                quantBefore,
                                quantCurrent: Number(quant),
                                idItem,
                                price
                            },
                            csrfToken
                        }).then(() => {
                            setRefreshTokenWarn(true).finally(() =>
                                setRefreshTokenWarn(false)
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
                setRefreshTokenWarn(true).finally(() =>
                    setRefreshTokenWarn(false)
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
        getTotalPrice(csrfToken).then((res) => {
            if (res.error) {
                refresheTokenFunction(res, () => getTotalPrice(csrfToken))
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataItems(csrfToken)
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

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
                            <ButtonCart onClick={handleDoPurchase}>
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
