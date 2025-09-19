import { useEffect, useRef, useState } from 'react'
import Card from '@/components/Card'
import {
    ButtonNavPage,
    ButtonSeeAll,
    NavPageAllBooks,
    NavPageBooks,
    PublicLibContainer
} from './styles'
import {
    useGetPublicBooksLengthQuery,
    useLazyGetPublicBooksQuery
} from '@/services/api'
import { getItemFromCache, verifyIfIsCached } from '@/utils/cacheConfig'
import SkeletonCard from '@/components/SkeletonCard'
import { isOnDevelopment } from '@/utils'
import { Link } from 'react-router-dom'

const PublicLib = () => {
    const [getPublicBooks, { isFetching }] = useLazyGetPublicBooksQuery()
    const { data: publicBooksTotalLength } = useGetPublicBooksLengthQuery()
    const [data, setData] = useState<Books[]>()
    const localPublicBooks = getItemFromCache<{
        cache: Books[]
        timeExpiration: number
    }>('publicBooks')
    const hasMounted = useRef(false)

    const [page, setPage] = useState(1)
    const booksQuantPage = 4
    const [offSet, setOffSet] = useState(0)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [prevDisabled, setPrevDisabled] = useState(true)
    const mainLibElement = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!mainLibElement.current) return
        if (!publicBooksTotalLength) return

        if (!isOnDevelopment) {
            if (window.innerWidth <= 767) {
                setData(publicBooksTotalLength.slice(0, 3))
                hasMounted.current = true
                return
            }
            getPublicBooks({
                take: booksQuantPage,
                skip: offSet
            }).then((res) => {
                if (res.data) {
                    setData(res.data)
                    hasMounted.current = true
                }
            })
            return
        }

        if (window.innerWidth <= 767) {
            setData(publicBooksTotalLength.slice(0, 3))
            hasMounted.current = true

            return
        }
        verifyIfIsCached(
            localPublicBooks,
            setData,
            getPublicBooks,
            'publicBooks',
            { take: booksQuantPage, skip: offSet, isLength: false }
        )
        hasMounted.current = true

        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getPublicBooks, publicBooksTotalLength])

    useEffect(() => {
        if (!hasMounted.current) return
        setNextDisabled(
            page * booksQuantPage >=
                (publicBooksTotalLength?.length as number) || isFetching
        )

        setPrevDisabled(page === 1)

        getPublicBooks({
            take: booksQuantPage,
            skip: offSet
        }).then((res) => {
            if (res.data) {
                setData(res.data)
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getPublicBooks, offSet])

    const handleNext = () => {
        setOffSet((p) => p + booksQuantPage)
        setPage((p) => p + 1)
    }

    const handlePrev = () => {
        setOffSet((p) => p - booksQuantPage)
        setPage((p) => p - 1)
    }

    return (
        <PublicLibContainer
            ref={mainLibElement}
            id="public-lb"
            className="public-lb container"
        >
            <h2 className="public-lb__title">TÁRTARO CAFETERIA</h2>
            <div>
                {!isFetching ? (
                    <div className="all-books">
                        {data &&
                            data.map(
                                ({ title, id, link, photo, descBooks }) => (
                                    <Card
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
                    </div>
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
                <NavPageBooks aria-label="Paginação">
                    <li>
                        <ButtonNavPage
                            className={`${prevDisabled && 'is-disabled'}`}
                            disabled={prevDisabled}
                            onClick={handlePrev}
                        >
                            Anterior
                        </ButtonNavPage>
                    </li>
                    <li>
                        <ButtonNavPage
                            className={`${nextDisabled && 'is-disabled'}`}
                            disabled={nextDisabled}
                            onClick={handleNext}
                        >
                            Próximo
                        </ButtonNavPage>
                    </li>
                </NavPageBooks>
                <NavPageAllBooks>
                    <ButtonSeeAll
                        as={Link}
                        to="all-projects"
                        className="see-all"
                    >
                        VER TODAS
                    </ButtonSeeAll>
                </NavPageAllBooks>
            </div>
        </PublicLibContainer>
    )
}

export default PublicLib
