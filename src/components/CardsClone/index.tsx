import { useEffect, useRef, useState } from "react"
import Card from "../Card"

interface PropsData extends Books {}
type PropsClone = {
    quant: number | undefined
    idName: string
    removeTouchStart: boolean
    removeTouchMove: boolean
    removeTouchEnd: boolean
    carrousselItems: NodeListOf<Element> | null
    items: Element[] | undefined
    clonedMainRight: number | undefined
    clonedMainLibLeft: number | undefined
    elementWidth: number | undefined
    mainLib: number | undefined
    setRemoveTouchMove: (value: React.SetStateAction<boolean>) => void
    setRemoveTouchEnd: (value: React.SetStateAction<boolean>) => void
}

const CardsClone = ({
    quant,
    idName,
    removeTouchStart,
    removeTouchMove,
    removeTouchEnd,
    carrousselItems,
    clonedMainLibLeft,
    clonedMainRight,
    elementWidth,
    items,
    mainLib,
    setRemoveTouchEnd,
    setRemoveTouchMove,

}: PropsClone) => {
    const [data, setData] = useState<PropsData[]>()
    const [newClone, setNewClone] = useState<PropsData[]>()
    const hasMounted = useRef(false)

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true
            fetch(`http://localhost:9001/public-books`, {
                method: 'GET'
            }).
                then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return res.text()
                })
                .then(text => {
                    try {
                        const json = JSON.parse(text);
                        setData(json);
                    } catch (error) {
                        const err = error as Error
                        throw new Error('Failed to parse JSON: ' + err.message);
                    }
                })
                .catch(err => {
                    console.error('There was a problem with the fetch operation:', err)
                })
        }
    }, [])

    useEffect(() => {
        const clones = data?.slice(0, quant)
        setNewClone(clones)
    }, [data, quant])

    return (
        <>
            {
                newClone?.map(({ id, title, link, photo, desc }) => (
                    <Card setRemoveTouchMove={setRemoveTouchMove} setRemoveTouchEnd={setRemoveTouchEnd} mainLib={mainLib} elementWidth={elementWidth} clonedMainRight={clonedMainRight} items={items} clonedMainLibLeft={clonedMainLibLeft} carrousselItems={carrousselItems} removeTouchEnd={removeTouchEnd} removeTouchMove={removeTouchMove} removeTouchStart={removeTouchStart} idName={idName} key={id} clone id={id} title={title} link={link} photo={photo} desc={desc} />
                ))
            }
        </>
    )
}

export default CardsClone
