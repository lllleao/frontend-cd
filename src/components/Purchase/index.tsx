import { useEffect, useRef, useState } from 'react'
import { PurchaseContainer } from './styles'
import Card from '../Card'
import { useLazyGetStoreBooksQuery } from '../../services/api'
import { addItemToCache, getItemFromCache } from '../../utils/cacheConfig'
import SkeletonCard from '../SkeletonCard'

const Purchase = () => {
    const [getStoreBooks] = useLazyGetStoreBooksQuery()
    const booksFromLocal = getItemFromCache<BooksFromStore[]>('booksStore')
    const [data, setData] = useState<BooksFromStore[]>()
    const [inView, setInView] = useState(false)
    const storeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        function handleObserver(entries: IntersectionObserverEntry[]) {
            entries.forEach((entry) => {
                setInView(entry.isIntersecting)
            })
        }

        const purchaseObserver = new IntersectionObserver(handleObserver)

        if (storeRef.current) {
            purchaseObserver.observe(storeRef.current)
        }

        return () => {
            if (storeRef.current) {
                // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
                purchaseObserver.unobserve(storeRef.current)
            }
            purchaseObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if (booksFromLocal) {
            return setData(booksFromLocal)
        }
        getStoreBooks().then((res) => {
            if (res.data) {
                addItemToCache('booksStore', res.data)
                setData(res.data)
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getStoreBooks])

    return (
        <PurchaseContainer ref={storeRef} id="purchase" className="container">
            <h2 className="purchase__title">
                Que tal aproveitar e olhar os nossos materiais físicos [e
                pagos]?
                <br />
                <br />
                [ENTREGA SOMENTE PARA FORTALEZA/CE]
            </h2>
            <span>[clique na capa para comprar]</span>
            <div
                className={`store card_container ${inView ? 'store--is-active' : ''}`}
            >
                {data ? (
                    data.map(({ descBooks, id, photo, title, price }) => (
                        <Card
                            type
                            key={id}
                            descBooks={descBooks}
                            price={price}
                            link={`/store/${id}`}
                            photo={photo}
                            title={title}
                        />
                    ))
                ) : (
                    <div className="container-skeleton-store">
                        <div className="skeletons-store">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    </div>
                )}
            </div>
        </PurchaseContainer>
    )
}

export default Purchase
