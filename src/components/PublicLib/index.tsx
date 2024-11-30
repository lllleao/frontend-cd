import { useEffect, useRef, useState } from "react"
import Card from "../Card"
import { Carrossel, PublicLibContainer } from "./styles"
import CardsClone from "../CardsClone"
import { useGetPublicBooksQuery } from "../../services/api"

const PublicLib = () => {
    const { data } = useGetPublicBooksQuery()
    const carrousselRef = useRef<HTMLDivElement>(null)
    const hasMounted = useRef(false)

    const [removeTouchStart, setRemoveTouchStart] = useState(false)
    const [removeTouchEnd, setRemoveTouchEnd] = useState(true)
    const [removeTouchMove, setRemoveTouchMove] = useState(true)

    const [carrousselItems, setCarrousselItems] = useState<NodeListOf<Element> | null>(null)
    const [items, setItems] = useState<Element[]>()
    const [mainLib, setMainLib] = useState<number>()
    const mainLibElement = useRef(null)
    const [clonedMainLibLeft, setClonedMainLibLeft] = useState<number>()
    const [clonedMainRight, setClonedMainRight] = useState<number>()
    const [elementWidth, setElementWidth] = useState<number>()

    useEffect(() => {
        const handleResizer = (entries: ResizeObserverEntry[]) => {
            const currentWidth = entries[0].borderBoxSize[0].inlineSize
            if (currentWidth > 706 && carrousselItems) {
                setRemoveTouchStart(true)
                setRemoveTouchEnd(true)
                setRemoveTouchMove(true)
                carrousselItems.forEach(item => {
                    (item as HTMLElement).style.cssText = `transform: none;`
                })
            } else if (carrousselItems) {
                
                setElementWidth(carrousselItems[0].clientWidth)
                setRemoveTouchStart(false)
                setRemoveTouchEnd(false)
                setRemoveTouchMove(false)
            }
        }

        const resizerObserver = new ResizeObserver(handleResizer)

        if (mainLibElement.current) {
            resizerObserver.observe(mainLibElement.current)
        }

        return () => {
            if (mainLibElement.current) {
                resizerObserver.unobserve(mainLibElement.current)
            }
            resizerObserver.disconnect()
        }
    }, [carrousselItems])

    useEffect(() => {
        if (carrousselRef.current && data && !hasMounted.current) {
            hasMounted.current = true
            const carrousselInner = carrousselRef.current.querySelectorAll('.card_lib')
            setCarrousselItems(carrousselRef.current.querySelectorAll('.card_lib'))
            const itemsInner = [...carrousselInner]
            setItems(itemsInner)
            setMainLib(itemsInner.indexOf(carrousselRef.current.querySelector('#main') as Element))
            setClonedMainLibLeft(itemsInner.indexOf(carrousselRef.current.querySelector('#main_cloned_left') as Element))
            setClonedMainRight(itemsInner.indexOf(carrousselRef.current.querySelector('#main_cloned_right') as Element))
        }
    }, [data, elementWidth])

    return (
        <PublicLibContainer ref={mainLibElement} id="public-lb" className="public-lb container">
            <h2 className="public-lb__title">TÁRTARO CAFETERIA</h2>
            <p className="public-lb__desc">
                Em uma cidade escondida de tudo há uma cafeteria exótica na
                beira de uma fenda, uma fenda tão profunda que pode até mostrar
                o rio Tártaro do Hades. Esta cafeteria é a Tartaru's Coffee
                Shop, localizada na Cidade Eclipse.
                <br />
                <br />
                Entre, dê uma espiada nas nossas profundezas - mas não proteja
                os olhos, hein!
            </p>
            <div className="cursor">
                <span className="mask-left"></span>
                <span className="mask-right"></span>
                <Carrossel ref={carrousselRef} className="card_container carroussel">
                    <CardsClone setRemoveTouchMove={setRemoveTouchMove} setRemoveTouchEnd={setRemoveTouchEnd} mainLib={mainLib} items={items} elementWidth={elementWidth} clonedMainRight={clonedMainRight} clonedMainLibLeft={clonedMainLibLeft} carrousselItems={carrousselItems} removeTouchEnd={removeTouchEnd} removeTouchMove={removeTouchMove} removeTouchStart={removeTouchStart} idName="main_cloned_left" quant={data?.length} data={data} />
                    {
                        data && data.map(({ title, id, link, photo, desc }) => (
                            <Card mainLib={mainLib} elementWidth={elementWidth} setRemoveTouchMove={setRemoveTouchMove} setRemoveTouchEnd={setRemoveTouchEnd} items={items} clonedMainRight={clonedMainRight} clonedMainLibLeft={clonedMainLibLeft} carrousselItems={carrousselItems} removeTouchEnd={removeTouchEnd} removeTouchMove={removeTouchMove} removeTouchStart={removeTouchStart} idName="main" title={title} id={id} link={link}
                                photo={photo} desc={desc} key={id} />
                        ))
                    }
                    <CardsClone setRemoveTouchMove={setRemoveTouchMove} setRemoveTouchEnd={setRemoveTouchEnd} mainLib={mainLib} items={items} elementWidth={elementWidth} clonedMainRight={clonedMainRight} clonedMainLibLeft={clonedMainLibLeft} carrousselItems={carrousselItems} removeTouchEnd={removeTouchEnd} removeTouchMove={removeTouchMove} removeTouchStart={removeTouchStart} idName="main_cloned_right" quant={3} data={data} />
                </Carrossel>
            </div>
        </PublicLibContainer>
    )
}

export default PublicLib
