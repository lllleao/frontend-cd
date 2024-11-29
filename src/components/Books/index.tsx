import { useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useEffect, useState } from 'react'
import ButtonPurchase from '../ButtonPurchase'
import { apiUrl } from '../../utils'
import { useAddToCartMutation } from '../../services/api'

let isSeeMore: boolean = false
const Book = () => {
    const [ addToCart ] = useAddToCartMutation()
    const [data, setData] = useState<BooksPurchase>()
    const [valueQuant, setValueQuant] = useState('1')
    const [priceCalc, setPriceCalc] = useState(10)
    const [textIsHidden, setTextIsHidden] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        fetch(`${apiUrl}/store-books/${id}`, {
            method: 'GET'
        }).then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(err => console.error('There was a problem with the fetch operation:', err))
    }, [])

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

    const handleChangeOption = (element: React.ChangeEvent<HTMLSelectElement>) => {
        const quant = element.target.value
        setValueQuant(quant)
        const currentValue = (data && data.price * Number(quant))
        setPriceCalc(currentValue as number)

        return currentValue
    }

    const handleAddToCart = () => {
        if (data) {
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
        }
    }

    return (
        <BooksPurchase>
            <div className="container">
                <div className="book">
                    <BookImg>
                        <img src={data?.photo} alt='' />
                        <p className="price-container">
                        <span className="price">[ R$ {priceCalc},00 ]</span>
                        <select onChange={(e) => handleChangeOption(e)} className="quant" name="quant" value={valueQuant}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        </p>
                    </BookImg>
                    <AboutBook $isSeeMore={isSeeMore}>
                        <h3>
                            {data?.title}
                        </h3>
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
                                    <span className="sinopse__view__second">

                                    </span>
                                    {textIsHidden ? (
                                        <span onClick={() => setTextIsHidden(false)} className='see-more'>[Ver mais]</span>
                                    ) :
                                    (
                                        <span onClick={() => setTextIsHidden(true)} className='see-more'>[Ver menos]</span>
                                    )}
                                </span>
                            </span>
                        </p>
                        <div className="others-informations">
                            <ul>
                                {data?.isbn && (
                                    <li><span className="sinopse-title">ISBN: </span>{data.isbn}</li>
                                )}
                                <li>
                                    <span className="sinopse-title">Tamanho: </span> {data?.width}
                                </li>
                                <li>
                                    <span className="sinopse-title">Número de Páginas: </span> {data?.pageQuant}
                                </li>
                                {data?.credits.map(item => (
                                    <li key={item.person}><span className="sinopse-title">{item.type}: </span>{item.person}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="tags">
                            {data?.tags}
                        </div>
                    </AboutBook>
                </div>
                <div className="buttons">
                    <ButtonPurchase>Comprar agora</ButtonPurchase>
                    <ButtonPurchase addToCart={handleAddToCart}>Adicionar ao carrinho</ButtonPurchase>
                </div>
            </div>
        </BooksPurchase>
    )
}

export default Book
