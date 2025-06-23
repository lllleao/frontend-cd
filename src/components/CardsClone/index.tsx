import Card from '../Card'

type PropsClone = {
    data: Books[] | undefined
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
    data,
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
    setRemoveTouchMove
}: PropsClone) => {
    const clones = data?.slice(0, quant)

    return (
        <>
            {clones?.map(({ id, title, link, photo, descBooks }) => (
                <Card
                    setRemoveTouchMove={setRemoveTouchMove}
                    setRemoveTouchEnd={setRemoveTouchEnd}
                    mainLib={mainLib}
                    elementWidth={elementWidth}
                    clonedMainRight={clonedMainRight}
                    items={items}
                    clonedMainLibLeft={clonedMainLibLeft}
                    carrousselItems={carrousselItems}
                    removeTouchEnd={removeTouchEnd}
                    removeTouchMove={removeTouchMove}
                    removeTouchStart={removeTouchStart}
                    idName={idName}
                    key={id}
                    clone
                    id={id}
                    title={title}
                    link={link}
                    photo={photo}
                    descBooks={descBooks}
                />
            ))}
        </>
    )
}

export default CardsClone
