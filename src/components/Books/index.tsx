import { useNavigate, useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useState } from 'react'
import ButtonPurchase from '../ButtonPurchase'
import {
    useAddToCartMutation,
    useGetItemsCartQuery,
    useGetSpecificStoreBookQuery,
    useGetStoreBooksQuery
} from '../../services/api'
import Card from '../Card'

let isSeeMore: boolean = false

type PropData = {
    msg: string
}

type BookParams = {
    id: string
}
const Book = () => {
    const channelName = 'cart_channel'
    const [addToCart] = useAddToCartMutation()
    const { refetch } = useGetItemsCartQuery()
    const navigate = useNavigate()
    const [valueQuant, setValueQuant] = useState('1')
    const [priceCalc, setPriceCalc] = useState(10)
    const [textIsHidden, setTextIsHidden] = useState(true)
    const [isItemAdd, setIsItemAdd] = useState(false)
    const { id } = useParams() as BookParams
    const { data, isFetching } = useGetSpecificStoreBookQuery(id)
    const { data: booksStore } = useGetStoreBooksQuery()

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
            const channel = new BroadcastChannel(channelName)
            channel.postMessage({ type: 'UPDATE_COUNT', value: 'opa' })
            channel.close()
            setTimeout(refetch, 1000)
            console.log(data.id)
            addToCart({
                items: [
                    {
                        photo: data.photo,
                        price: priceCalc,
                        quant: Number(valueQuant),
                        name: data.title
                    }
                ]
            })
                .then((res) => {
                    // Isso aqui existe porque aqui acaba tendo uma união de tipos FetchBaseQueryError | SerializedError, por isso é preciso verificar também se existe a propriedade status em error
                    if (
                        res.error &&
                        'status' in res.error &&
                        'data' in res.error &&
                        res.error.data
                    ) {
                        const errorData = res.error.data as PropData
                        if (errorData.msg === 'não criado') {
                            setIsItemAdd(true)
                            setTimeout(() => {
                                setIsItemAdd(false)
                            }, 3000)
                        } else {
                            navigate('/login')
                        }
                    }
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
                </div>
                <div className="cards-store-container">
                    {booksStore &&
                        booksStore.map(({ descBooks, id, photo, title, price }) => (
                            <Card
                                type
                                key={id}
                                descBooks={descBooks}
                                price={price}
                                link={`/store-books/${id}`}
                                photo={photo}
                                title={title}
                            />
                        ))}
                </div>
            </div>
        </BooksPurchase>
    )
}

export default Book
