import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from './styles'
import {
    useGetRemoveItemMutation,
    useLazyGetItemsCartQuery,
    useLazyGetStoreBooksQuery,
    useUpdatePriceMutation
} from '@/services/api'
import { useEffect, useState } from 'react'
import Card from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { calcFrete, isLoginAndCsrf } from '@/utils'
import { getItemFromCache, verifyIfIsCached } from '@/utils/cacheConfig'
import SkeletonCard from '@/components/SkeletonCard'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store'
import { channelBroadcast } from '@/utils/channelBroadcast'
import Loader from '@/components/Loader'
import useRefreshToken from '@/hooks/useRefreshToken'
import WitheBar from '../WitheBar'

const ProductsListCart = () => {
    const refresheTokenFunction = useRefreshToken()
    const booksFromLocal = getItemFromCache<{
        cache: BooksFromStore[]
        timeExpiration: number
    }>('booksStore')

    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const [totalPrice, setTotalPrice] = useState(0)

    const refreshTokenWarn = useCsrfTokenStore(
        (state) => state.refreshTokenWarn
    )

    const setRefreshTokenWarn = useCsrfTokenStore(
        (state) => state.setRefreshTokenWarn
    )

    const { numberCart } = useSelector((state: RootReducer) => state.cart)

    const [loading, setLoading] = useState(false)
    const [getDataItems, { data, isFetching }] = useLazyGetItemsCartQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()
    const [updatePrice] = useUpdatePriceMutation()
    const [getStoreBooks] = useLazyGetStoreBooksQuery()

    const [booksStore, setBooksStore] = useState<BooksFromStore[]>()

    const navigate = useNavigate()

    const handleDoPurchase = () => {
        if (totalPrice && totalPrice !== 0 && data && !loading) {
            navigate('/checkout')
        }
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
                            })
                        })
                    }
                    setLoading(false)
                    channelBroadcast(numberCart - 1)
                    setRefreshTokenWarn(true).finally(() =>
                        setRefreshTokenWarn(false)
                    )
                })
                .catch((error) => console.error('Erro ao remover item:', error))
        }
    }

    const handleChangeOption = (
        element: React.ChangeEvent<HTMLSelectElement>,
        idItem: number | undefined
    ) => {
        const quant = element.target.value
        setLoading(true)
        updatePrice({
            data: {
                quantCurrent: Number(quant),
                idItem
            },
            csrfToken
        })
            .then((res) => {
                if (res.error) {
                    return refresheTokenFunction(res, () => {
                        updatePrice({
                            data: {
                                quantCurrent: Number(quant),
                                idItem
                            },
                            csrfToken
                        }).then(() => {
                            setRefreshTokenWarn(true).finally(() =>
                                setRefreshTokenWarn(false)
                            )
                            setLoading(false)
                        })
                    })
                }
                setRefreshTokenWarn(true).finally(() =>
                    setRefreshTokenWarn(false)
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
    }, [refreshTokenWarn])

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getDataItems(csrfToken).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    getDataItems(csrfToken).then((response) => {
                        if (response.data) {
                            setTotalPrice(
                                response.data.items.reduce(
                                    (acum, currentPrice) => {
                                        return (
                                            acum +
                                            currentPrice.price *
                                                currentPrice.quant
                                        )
                                    },
                                    0
                                )
                            )
                        }
                    })
                })
            }
            if (res.data) {
                setTotalPrice(
                    res.data.items.reduce((acum, currentPrice) => {
                        return acum + currentPrice.price * currentPrice.quant
                    }, 0)
                )
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, refreshTokenWarn])

    return (
        <>
            <ProductsListCartContainer>
                <div className="container">
                    <ItemsOnCart>
                        <h3>ITENS NO CARRINHO</h3>
                        <WitheBar />
                        <ul className="books-list">
                            {data &&
                                data.items.map(
                                    ({
                                        id,
                                        photo,
                                        price,
                                        name,
                                        quant,
                                        stock
                                    }) => (
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
                                                Valor: R$ {price * quant},00
                                                <select
                                                    onChange={(e) =>
                                                        handleChangeOption(
                                                            e,
                                                            id
                                                        )
                                                    }
                                                    className={`quant ${loading ? 'disabled' : ''}`}
                                                    name="quant"
                                                    value={quant}
                                                    disabled={loading}
                                                >
                                                    {Array(stock)
                                                        .fill(stock)
                                                        .map((_, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    index + 1
                                                                }
                                                            >
                                                                {index + 1}
                                                            </option>
                                                        ))}
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
                        <br />
                        <WitheBar />
                    </ItemsOnCart>
                    <span className="frete-message">
                        Compras a partir de R$ 50,00{' '}
                        <strong>EM PRODUTOS</strong> tem{' '}
                        <strong>FRETE GRÁTIS</strong>
                    </span>
                    <span className="frete">Frete: R$ 10,00</span>
                    <span className="total">
                        Preço total: R${' '}
                        {isFetching ? (
                            <Loader isCircle />
                        ) : totalPrice ? (
                            calcFrete(totalPrice)
                        ) : (
                            0
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
