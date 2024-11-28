import { useEffect, useRef, useState } from "react"
import { PurchaseContainer } from "./styles"
import Card from "../Card"
import { useGetStoreBooksQuery } from "../../services/api"

const Purchase = () => {
    const { data } = useGetStoreBooksQuery()
    const [inView, setInView] = useState(false)
    const storeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        function handleObserver(entries: IntersectionObserverEntry[]) {

            entries.forEach(entry => {
                setInView(entry.isIntersecting)
        })
        }

        const purchaseObserver = new IntersectionObserver(handleObserver)

        if (storeRef.current) {
            purchaseObserver.observe(storeRef.current)
        }

        return () => {
            if (storeRef.current) {
                purchaseObserver.unobserve(storeRef.current)
            }
            purchaseObserver.disconnect()
        }
    }, [])

    return (
        <PurchaseContainer ref={storeRef} id="purchase" className="container">
            <h2 className="purchase__title">Que tal aproveitar e olhar os nossos materiais físicos [e pagos]?</h2>
            <span>[clique na capa para comprar]</span>
            <div className={`store card_container ${inView ? 'store--is-active' : ''}`}>
                {
                    data && data.map(({desc, id, photo, title, price}) => (
                        <Card type key={id} desc={desc} price={price} link={`/store-books/${id}`} photo={photo} title={title} />
                    ))
                }
            </div>
        </PurchaseContainer>
    )
}

export default Purchase
