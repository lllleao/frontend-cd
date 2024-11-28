import { CardContainer } from './styles'
import { brFunction } from '../../utils'
import { handleTouch, loop, onMouseMove, onMouseUp } from '../../utils/carousel'

export type Props = {
    link: string
    title: string
    desc: string
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
const Card = ({ mainLib, elementWidth, setRemoveTouchEnd, setRemoveTouchMove, clonedMainLibLeft, clonedMainRight, items, carrousselItems, title, link, photo, desc, type, clone, id, idName, removeTouchStart, removeTouchMove, removeTouchEnd, price }: Props) => {

    function emptyFunction() {
        //
    }

    return (
        <CardContainer
            target="_blank"
            to={link}
            title={title}
            className={`card_container__book ${type ? 'product' : 'card_lib'} ${clone ? 'cloned' : ''}`}
            rel="noreferrer"
            id={id == 2 ? idName : ''}
            onTouchStart={(e) => removeTouchStart ? emptyFunction : handleTouch(e, carrousselItems, items, clonedMainRight, clonedMainLibLeft, setRemoveTouchMove, setRemoveTouchEnd)}
            onTouchMove={(e) => removeTouchMove ? emptyFunction : onMouseMove(e, carrousselItems, setRemoveTouchEnd)}
            onTouchEnd={() => removeTouchEnd ? emptyFunction : onMouseUp(elementWidth, mainLib, clonedMainLibLeft, clonedMainRight, carrousselItems)}
            onTransitionEnd={(e) => loop(e)}
        >
            <img src={photo} alt={desc} />
            <h3>
                {
                    type ? (
                        title
                    ) : (
                        <>
                            {brFunction(title).firstPart}
                            < br />
                            {brFunction(title).secondPart}
                        </>
                    )
                }
            </h3>
            {
                type ? (
                    <p>R$ {price},00</p>
                ) : (
                    <></>
                )
            }
        </CardContainer>
    )
}

export default Card
