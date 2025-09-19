import { useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase, SkeletonText } from './styles'
import { useEffect, useState } from 'react'
import ButtonPurchase from '@/components/ButtonPurchase'
import {
    useAddToCartMutation,
    useLazyGetSpecificStoreBookQuery,
    useLazyGetStoreBooksQuery,
    useRefreshTokenMutation
} from '@/services/api'
import Card from '@/components/Card'
import Loader from '@/components/Loader'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { isErrorMessageExist } from '@/utils'
import { getItemFromCache, verifyIfIsCached } from '@/utils/cacheConfig'
import SkeletonCard from '@/components/SkeletonCard'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store'
import useLogout from '@/hooks/useLogout'
import { channelBroadcast } from '@/utils/channelBroadcast'
import { BooksPurchaseInterface } from '@/interfaces/interfaces'

let isSeeMore: boolean = false

type BookParams = {
    id: string
}
const Book = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const setViweNumberCart = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const { numberCart } = useSelector((state: RootReducer) => state.cart)

    const logout = useLogout()

    const channelName = 'cart_channel'
    const [addToCart] = useAddToCartMutation()
    const [valueQuant, setValueQuant] = useState('1')
    const [addCartLoader, setAddCartLoader] = useState(false)
    const [buttonMessage, setButtonMessage] = useState('Adicionar ao carrinho')
    const [priceCalc, setPriceCalc] = useState(10)
    const [synopsisIsHidden, setSynopsisIsHidden] = useState(true)
    const [summaryIsHidden, setSummaryIsHidden] = useState(true)
    const [isItemAdd, setIsItemAdd] = useState(false)
    const { id } = useParams() as BookParams

    const booksFromLocal = getItemFromCache<{
        cache: BooksFromStore[]
        timeExpiration: number
    }>('booksStore')

    const [booksStore, setBooksStore] = useState<BooksFromStore[]>()
    const [getSpecificBook] = useLazyGetSpecificStoreBookQuery()
    const [data, setData] = useState<BooksPurchaseInterface>()
    const specificBook = getItemFromCache<{
        cache: BooksPurchaseInterface
        timeExpiration: number
    }>(`specific${id}`)
    const [getStoreBooks] = useLazyGetStoreBooksQuery()

    const [getRefresh] = useRefreshTokenMutation()

    const only212Characters = (text: string, isHidden: boolean) => {
        const appear = text.slice(0, 212)
        const allText = text
        const lengthCheck = text.length || 0

        if (lengthCheck > 212 && isHidden) {
            isSeeMore = true
            return appear + '...'
        } else {
            return allText
        }
    }

    const handleChangeOption = (
        element: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const quant = element.target.value
        setValueQuant(quant)
        const currentValue = data && data.price * Number(quant)
        setPriceCalc(currentValue as number)

        return currentValue
    }

    const handleAddToCart = () => {
        if (data && csrfToken) {
            setAddCartLoader(true)
            const channel = new BroadcastChannel(channelName)

            addToCart({
                items: {
                    photo: data.photo,
                    price: data.price,
                    quant: Number(valueQuant),
                    name: data.title,
                    id: data.id as number,
                    stock: data.stock
                },
                csrfToken
            })
                .then((res) => {
                    if (isErrorMessageExist(res)) {
                        const message = res.error.data.message as string

                        switch (message) {
                            case 'Token expirado':
                                return getRefresh(csrfToken).then(
                                    (response) => {
                                        if (response.error) {
                                            setAddCartLoader(false)

                                            logout('/login')
                                            return
                                        }

                                        addToCart({
                                            items: {
                                                photo: data.photo,
                                                price: data.price,
                                                quant: Number(valueQuant),
                                                name: data.title,
                                                id: data.id as number,
                                                stock: data.stock
                                            },
                                            csrfToken
                                        }).then((resAddTo) => {
                                            if (isErrorMessageExist(resAddTo)) {
                                                if (
                                                    resAddTo.error.data
                                                        .message ===
                                                    'Item já existe'
                                                ) {
                                                    setAddCartLoader(false)

                                                    setIsItemAdd(true)
                                                    setTimeout(() => {
                                                        setIsItemAdd(false)
                                                    }, 3000)
                                                    return res.data
                                                }
                                            }
                                            channelBroadcast(numberCart + 1)
                                            channel.close()
                                            setButtonMessage('Item adicionado')
                                            setTimeout(
                                                () =>
                                                    setButtonMessage(
                                                        'Adicionar ao carrinho'
                                                    ),
                                                3000
                                            )
                                            setAddCartLoader(false)
                                        })
                                    }
                                )
                            case 'Item já existe':
                                setAddCartLoader(false)

                                setIsItemAdd(true)
                                setTimeout(() => {
                                    setIsItemAdd(false)
                                }, 3000)
                                return res.data
                            default:
                                setAddCartLoader(false)
                                logout('/login')

                                return
                        }
                    }
                    setViweNumberCart(true)
                    channelBroadcast(numberCart + 1)

                    setButtonMessage('Item adicionado')
                    setTimeout(
                        () => setButtonMessage('Adicionar ao carrinho'),
                        3000
                    )
                    setAddCartLoader(false)
                })
                .catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        verifyIfIsCached(
            booksFromLocal,
            setBooksStore,
            getStoreBooks,
            'booksStore'
        )
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getStoreBooks])

    useEffect(() => {
        if (!id) return
        setButtonMessage('Adicionar ao carrinho')
        setAddCartLoader(false)
        verifyIfIsCached(
            specificBook,
            setData,
            () => getSpecificBook(id),
            `specific${id}`
        )

        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getSpecificBook, id])

    return (
        <>
            <BooksPurchase $isFeching={false}>
                <div className="container">
                    {data ? (
                        <div className="book">
                            <BookImg>
                                <img srcSet={data.photo} alt="" />
                                <p className="price-container">
                                    <span className="price">
                                        [ R$ {priceCalc},00 ]
                                    </span>
                                    <select
                                        onChange={(e) => handleChangeOption(e)}
                                        className="quant"
                                        name="quant"
                                        value={valueQuant}
                                    >
                                        {Array(data.stock)
                                            .fill(data.stock)
                                            .map((_, index) => (
                                                <option
                                                    key={index}
                                                    value={index + 1}
                                                >
                                                    {index + 1}
                                                </option>
                                            ))}
                                    </select>
                                </p>
                            </BookImg>
                            <AboutBook $isSeeMore={isSeeMore}>
                                <h3>{data?.title}</h3>
                                <p className="sinopse">
                                    <span className="sinopse-title">
                                        Sinopse:{' '}
                                    </span>
                                    <span className="sinopse__view">
                                        <span className="sinopse__view__all">
                                            {data.synopsis}
                                        </span>
                                        <span className="sinopse__view__part">
                                            <span className="sinopse__view__first">
                                                {only212Characters(
                                                    data.synopsis,
                                                    synopsisIsHidden
                                                )}
                                            </span>
                                            <span className="sinopse__view__second"></span>
                                            {data.synopsis.length <= 211 ? (
                                                <></>
                                            ) : synopsisIsHidden ? (
                                                <span
                                                    onClick={() =>
                                                        setSynopsisIsHidden(
                                                            false
                                                        )
                                                    }
                                                    className="see-more"
                                                >
                                                    [Ver mais]
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() =>
                                                        setSynopsisIsHidden(
                                                            true
                                                        )
                                                    }
                                                    className="see-more"
                                                >
                                                    [Ver menos]
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                </p>
                                {data.summary ? (
                                    <p className="summary">
                                        <span className="summary-title">
                                            Sumário:{' '}
                                        </span>
                                        <span className="summary__view">
                                            <span className="summary__view__all">
                                                {data.summary
                                                    .split(';')
                                                    .map((textSum, index) => (
                                                        <span
                                                            className="summary-span"
                                                            key={index}
                                                        >
                                                            {textSum}
                                                            <br />
                                                        </span>
                                                    ))}
                                            </span>
                                            <span className="summary__view__part">
                                                <span className="summary__view__first">
                                                    {only212Characters(
                                                        data.summary,
                                                        summaryIsHidden
                                                    )
                                                        .split(';')
                                                        .map(
                                                            (
                                                                textSum,
                                                                index
                                                            ) => (
                                                                <span
                                                                    className="summary-span"
                                                                    key={index}
                                                                >
                                                                    {textSum}
                                                                    <br />
                                                                </span>
                                                            )
                                                        )}
                                                </span>
                                                <span className="summary__view__second"></span>
                                                {data.summary.length <= 211 ? (
                                                    <></>
                                                ) : summaryIsHidden ? (
                                                    <span
                                                        onClick={() =>
                                                            setSummaryIsHidden(
                                                                false
                                                            )
                                                        }
                                                        className="see-more"
                                                    >
                                                        [Ver mais]
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() =>
                                                            setSummaryIsHidden(
                                                                true
                                                            )
                                                        }
                                                        className="see-more"
                                                    >
                                                        [Ver menos]
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                                <div className="others-informations">
                                    <ul>
                                        <li>
                                            <span className="sinopse-title">
                                                Número de Páginas:{' '}
                                            </span>{' '}
                                            {data?.pageQuant}
                                        </li>
                                        {data?.store_books_credits.map(
                                            (item) => (
                                                <li key={item.person}>
                                                    <span className="sinopse-title">
                                                        {item.type}:{' '}
                                                    </span>
                                                    {item.person}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="tags">{data?.tags}</div>
                            </AboutBook>
                        </div>
                    ) : (
                        <div className="container-skeleton-books">
                            <SkeletonCard />
                            <SkeletonText>
                                <div className="skeleton-title" />
                                <div className="skeleton-text" />
                                <div className="skeleton-text" />
                                <div className="skeleton-text" />
                            </SkeletonText>
                        </div>
                    )}
                    <div className="buttons">
                        <ButtonPurchase
                            isItemAdd={isItemAdd}
                            addToCart={handleAddToCart}
                        >
                            {isItemAdd ? 'Item já adicionado' : buttonMessage}
                        </ButtonPurchase>
                        {addCartLoader ? <Loader isCircle /> : <></>}
                    </div>
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
                            <div className="container-skeleton-foot-books">
                                <div>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </BooksPurchase>
        </>
    )
}

export default Book
