import { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import { Carrossel, PublicLibContainer } from './styles'
import CardsClone from '../CardsClone'
import { useLazyGetPublicBooksQuery } from '../../services/api'
import { addItemToCache, getItemFromCache } from '../../utils/cacheConfig'
import SkeletonCard from '../SkeletonCard'

const PublicLib = () => {
    const [getPublicBooks] = useLazyGetPublicBooksQuery()
    const [data, setData] = useState<Books[]>()
    const localPublicBooks = getItemFromCache<Books[]>('publicBooks')
    const carrousselRef = useRef<HTMLDivElement>(null)
    const hasMounted = useRef(false)

    const [removeTouchStart, setRemoveTouchStart] = useState(false)
    const [removeTouchEnd, setRemoveTouchEnd] = useState(true)
    const [removeTouchMove, setRemoveTouchMove] = useState(true)

    const [carrousselItems, setCarrousselItems] =
        useState<NodeListOf<Element> | null>(null)
    const [items, setItems] = useState<Element[]>()
    const [mainLib, setMainLib] = useState<number>()
    const mainLibElement = useRef(null)
    const [clonedMainLibLeft, setClonedMainLibLeft] = useState<number>()
    const [clonedMainRight, setClonedMainRight] = useState<number>()
    const [elementWidth, setElementWidth] = useState<number>()

    useEffect(() => {
        if (!carrousselItems) return
        const handleResizer = (entries: ResizeObserverEntry[]) => {
            const currentWidth = entries[0].borderBoxSize[0].inlineSize
            if (currentWidth > 706 && carrousselItems) {
                setRemoveTouchStart(true)
                setRemoveTouchEnd(true)
                setRemoveTouchMove(true)
                carrousselItems.forEach((item) => {
                    ;(item as HTMLElement).style.cssText = `transform: none;`
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
                // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
                resizerObserver.unobserve(mainLibElement.current)
            }
            resizerObserver.disconnect()
        }
    }, [carrousselItems])

    useEffect(() => {
        // if (localPublicBooks) {
        //     return setData(localPublicBooks)
        // }
        getPublicBooks().then((res) => {
            if (res.data) {
                setData(res.data)
                // addItemToCache('publicBooks', res.data)
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getPublicBooks])

    useEffect(() => {
        if (!data) return

        if (carrousselRef.current && data && !hasMounted.current) {
            hasMounted.current = true
            const carrousselInner =
                carrousselRef.current.querySelectorAll('.card_lib')
            setCarrousselItems(
                carrousselRef.current.querySelectorAll('.card_lib')
            )
            const itemsInner = [...carrousselInner]
            setItems(itemsInner)
            setMainLib(
                itemsInner.indexOf(
                    carrousselRef.current.querySelector('#main') as Element
                )
            )
            setClonedMainLibLeft(
                itemsInner.indexOf(
                    carrousselRef.current.querySelector(
                        '#main_cloned_left'
                    ) as Element
                )
            )
            setClonedMainRight(
                itemsInner.indexOf(
                    carrousselRef.current.querySelector(
                        '#main_cloned_right'
                    ) as Element
                )
            )
        }
    }, [data])

    return (
        <PublicLibContainer
            ref={mainLibElement}
            id="public-lb"
            className="public-lb container"
        >
            <h2 className="public-lb__title">TÁRTARO CAFETERIA</h2>
            <div className="cursor">
                <span className="mask-left"></span>
                <span className="mask-right"></span>
                {data ? (
                    <Carrossel
                        ref={carrousselRef}
                        className="card_container carroussel"
                    >
                        <CardsClone
                            setRemoveTouchMove={setRemoveTouchMove}
                            setRemoveTouchEnd={setRemoveTouchEnd}
                            mainLib={mainLib}
                            items={items}
                            elementWidth={elementWidth}
                            clonedMainRight={clonedMainRight}
                            clonedMainLibLeft={clonedMainLibLeft}
                            carrousselItems={carrousselItems}
                            removeTouchEnd={removeTouchEnd}
                            removeTouchMove={removeTouchMove}
                            removeTouchStart={removeTouchStart}
                            idName="main_cloned_left"
                            quant={data?.length}
                            data={data}
                        />
                        {data &&
                            data.map(
                                ({ title, id, link, photo, descBooks }) => (
                                    <Card
                                        mainLib={mainLib}
                                        elementWidth={elementWidth}
                                        setRemoveTouchMove={setRemoveTouchMove}
                                        setRemoveTouchEnd={setRemoveTouchEnd}
                                        items={items}
                                        clonedMainRight={clonedMainRight}
                                        clonedMainLibLeft={clonedMainLibLeft}
                                        carrousselItems={carrousselItems}
                                        removeTouchEnd={removeTouchEnd}
                                        removeTouchMove={removeTouchMove}
                                        removeTouchStart={removeTouchStart}
                                        idName="main"
                                        title={title}
                                        id={id}
                                        link={link}
                                        photo={photo}
                                        descBooks={descBooks}
                                        key={id}
                                    />
                                )
                            )}
                        <CardsClone
                            setRemoveTouchMove={setRemoveTouchMove}
                            setRemoveTouchEnd={setRemoveTouchEnd}
                            mainLib={mainLib}
                            items={items}
                            elementWidth={elementWidth}
                            clonedMainRight={clonedMainRight}
                            clonedMainLibLeft={clonedMainLibLeft}
                            carrousselItems={carrousselItems}
                            removeTouchEnd={removeTouchEnd}
                            removeTouchMove={removeTouchMove}
                            removeTouchStart={removeTouchStart}
                            idName="main_cloned_right"
                            quant={3}
                            data={data}
                        />
                    </Carrossel>
                ) : (
                    <div className="container-skeleton-public">
                        <div className="skeletons-public">
                            <SkeletonCard />
                            <SkeletonCard isDisplayNoneMobile />
                            <SkeletonCard isDisplayNoneMobile />
                            <SkeletonCard isDisplayNoneMobile />
                        </div>
                    </div>
                )}
            </div>
        </PublicLibContainer>
    )
}

export default PublicLib
