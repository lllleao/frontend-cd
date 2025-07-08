import { useNavigate, useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useState } from 'react'
import ButtonPurchase from '../ButtonPurchase'
import {
    useAddToCartMutation,
    useGetSpecificStoreBookQuery,
    useGetStoreBooksQuery,
    useLazyGetItemsCartQuery
} from '../../services/api'
import Card from '../Card'
import Loader from '../Loader'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'

let isSeeMore: boolean = false

type BookParams = {
    id: string
}
const Book = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const channelName = 'cart_channel'
    const [addToCart] = useAddToCartMutation()
    const [getDataItem] = useLazyGetItemsCartQuery()
    const navigate = useNavigate()
    const [valueQuant, setValueQuant] = useState('1')
    const [addCartLoader, setAddCartLoader] = useState(false)
    const [priceCalc, setPriceCalc] = useState(10)
    const [textIsHidden, setTextIsHidden] = useState(true)
    const [isItemAdd, setIsItemAdd] = useState(false)
    const { id } = useParams() as BookParams
    const { data, isFetching } = useGetSpecificStoreBookQuery(id)
    const { data: booksStore, isLoading } = useGetStoreBooksQuery()

    const only212Characters = () => {
        const appear = data?.summary.slice(0, 212)
        const allText = data?.summary
        const lengthCheck = data?.summary.length || 0

        if (lengthCheck > 212 && textIsHidden) {
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
        if (data) {
            setAddCartLoader(true)
            const channel = new BroadcastChannel(channelName)
            channel.postMessage({ type: 'UPDATE_COUNT', value: 'opa' })
            channel.close()
            if (csrfToken) {
                setTimeout(() => getDataItem(csrfToken), 1000)
            }
            addToCart({
                items: [
                    {
                        photo: data.photo,
                        price: priceCalc,
                        quant: Number(valueQuant),
                        name: data.title
                    }
                ],
                csrfToken
            })
                .then((res) => {
                    if (
                        res.error &&
                        typeof res.error === 'object' &&
                        'data' in res.error &&
                        res.error.data &&
                        typeof res.error.data === 'object' &&
                        'message' in res.error.data
                    ) {
                        if (
                            res.error.data.message === 'Token ausente.' ||
                            res.error.data.message === 'Token expirado' ||
                            res.error.data.message === 'Token mal formado'
                        ) {
                            setAddCartLoader(false)

                            return navigate('/login')
                        }
                        if (res.error.data.message === 'Item já existe') {
                            setAddCartLoader(false)

                            setIsItemAdd(true)
                            setTimeout(() => {
                                setIsItemAdd(false)
                            }, 3000)
                            return res.data
                        }
                        return res.data
                    }
                    setAddCartLoader(false)
                })
                .catch((err) => console.error(err))
        }
    }

    return (
        <BooksPurchase $isFeching={isFetching}>
            <div className="container">
                <div className="book">
                    <BookImg>
                        <img src={data?.photo} alt="" />
                        <p className="price-container">
                            <span className="price">[ R$ {priceCalc},00 ]</span>
                            <select
                                onChange={(e) => handleChangeOption(e)}
                                className="quant"
                                name="quant"
                                value={valueQuant}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </p>
                    </BookImg>
                    <AboutBook $isSeeMore={isSeeMore}>
                        <h3>{data?.title}</h3>
                        <p className="sinopse">
                            <span className="sinopse-title">Sinopse: </span>
                            <span className="sinopse__view">
                                <span className="sinopse__view__all">
                                    {data?.summary}
                                </span>
                                <span className="sinopse__view__part">
                                    <span className="sinopse__view__first">
                                        {only212Characters()}
                                    </span>
                                    <span className="sinopse__view__second"></span>
                                    {textIsHidden ? (
                                        <span
                                            onClick={() =>
                                                setTextIsHidden(false)
                                            }
                                            className="see-more"
                                        >
                                            [Ver mais]
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() =>
                                                setTextIsHidden(true)
                                            }
                                            className="see-more"
                                        >
                                            [Ver menos]
                                        </span>
                                    )}
                                </span>
                            </span>
                        </p>
                        <div className="others-informations">
                            <ul>
                                {data?.isbn && (
                                    <li>
                                        <span className="sinopse-title">
                                            ISBN:{' '}
                                        </span>
                                        {data.isbn}
                                    </li>
                                )}
                                <li>
                                    <span className="sinopse-title">
                                        Tamanho:{' '}
                                    </span>{' '}
                                    {data?.width}
                                </li>
                                <li>
                                    <span className="sinopse-title">
                                        Número de Páginas:{' '}
                                    </span>{' '}
                                    {data?.pageQuant}
                                </li>
                                {data?.store_books_credits.map((item) => (
                                    <li key={item.person}>
                                        <span className="sinopse-title">
                                            {item.type}:{' '}
                                        </span>
                                        {item.person}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tags">{data?.tags}</div>
                    </AboutBook>
                </div>
                <div className="buttons">
                    <ButtonPurchase
                        isItemAdd={isItemAdd}
                        addToCart={handleAddToCart}
                    >
                        {isItemAdd
                            ? 'Item já adicionado'
                            : 'Adicionar ao carrinho'}
                    </ButtonPurchase>
                    {addCartLoader ? <Loader isCircle /> : <></>}
                </div>
                <div className="cards-store-container">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        booksStore &&
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
                    )}
                </div>
            </div>
        </BooksPurchase>
    )
}

export default Book
