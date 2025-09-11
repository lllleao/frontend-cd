import { CardContainer, CardContainerStore } from './styles'

export type Props = {
    link: string
    title: string
    descBooks: string
    photo: string
    type?: boolean
    id?: number
    price?: number
    idName?: string
}
const Card = ({
    title,
    link,
    photo,
    descBooks,
    type,
    id,
    idName,
    price
}: Props) => {
    if (type) {
        return (
            <CardContainerStore
                className="card_container__book product"
                to={link}
                title={title}
            >
                <img srcSet={photo} alt={descBooks} />
                <h3>{title}</h3>
                <p>R$ {price},00</p>
            </CardContainerStore>
        )
    }

    return (
        <CardContainer
            target="_blank"
            href={link}
            title={title}
            className="card_lib card_lib_pub"
            rel="noreferrer"
            id={id == 2 ? idName : ''}
        >
            <img srcSet={photo} alt={descBooks} />
            <h3>{title}</h3>
        </CardContainer>
    )
}

export default Card
