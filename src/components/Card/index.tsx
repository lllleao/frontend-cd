import { CardContainer, CardContainerStore } from './styles'
import { handleTouch, loop, onMouseMove, onMouseUp } from '@/utils/carousel'

export type Props = {
    link: string
    title: string
    descBooks: string
    photo: string
    type?: boolean
    id?: number
    price?: number
    clone?: boolean
    idName?: string
    removeTouchStart?: boolean
    removeTouchMove?: boolean
    removeTouchEnd?: boolean
    carrousselItems?: NodeListOf<Element> | null
    items?: Element[] | undefined
    clonedMainRight?: number | undefined
    clonedMainLibLeft?: number | undefined
    elementWidth?: number | undefined
    mainLib?: number | undefined
    setRemoveTouchMove?: (value: React.SetStateAction<boolean>) => void
    setRemoveTouchEnd?: (value: React.SetStateAction<boolean>) => void
}
const Card = ({
    mainLib,
    elementWidth,
    setRemoveTouchEnd,
    setRemoveTouchMove,
    clonedMainLibLeft,
    clonedMainRight,
    items,
    carrousselItems,
    title,
    link,
    photo,
    descBooks,
    type,
    clone,
    id,
    idName,
    removeTouchStart,
    removeTouchMove,
    removeTouchEnd,
    price
}: Props) => {
    function emptyFunction() {
        //
    }

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
            className={`card_container__book card_lib ${clone ? 'cloned' : ''}`}
            rel="noreferrer"
            id={id == 2 ? idName : ''}
            onTouchStart={(e) =>
                removeTouchStart
                    ? emptyFunction
                    : handleTouch(
                          e,
                          carrousselItems,
                          items,
                          clonedMainRight,
                          clonedMainLibLeft,
                          setRemoveTouchMove,
                          setRemoveTouchEnd
                      )
            }
            onTouchMove={(e) =>
                removeTouchMove
                    ? emptyFunction
                    : onMouseMove(e, carrousselItems, setRemoveTouchEnd)
            }
            onTouchEnd={() =>
                removeTouchEnd
                    ? emptyFunction
                    : onMouseUp(
                          elementWidth,
                          mainLib,
                          clonedMainLibLeft,
                          clonedMainRight,
                          carrousselItems
                      )
            }
            onTransitionEnd={(e) => loop(e)}
        >
            <img srcSet={photo} alt={descBooks} />
            <h3>{title}</h3>
        </CardContainer>
    )
}

export default Card
