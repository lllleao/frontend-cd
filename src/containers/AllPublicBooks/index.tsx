import { useGetPublicBooksLengthQuery } from '@/services/api'
import { useEffect, useState } from 'react'
import { AllPublicBooksContainer, ButtonSeeAllBack } from './styles'
import SkeletonCard from '@/components/SkeletonCard'
import Card from '@/components/Card'
import { HashLink } from 'react-router-hash-link'

const AllPublicBooks = () => {
    const { data: publicBooksTotalLength, isFetching } =
        useGetPublicBooksLengthQuery()
    const [data, setData] = useState<Books[]>()

    useEffect(() => {
        if (!publicBooksTotalLength) return
        setData(publicBooksTotalLength)
    }, [publicBooksTotalLength])

    return (
        <AllPublicBooksContainer>
            <div className="container">
                <h2 className="title-all-projects">Cidade Eclipse</h2>
                <h3>TODAS AS EDIÇÕES GRATUITAS</h3>

                <div className="all-cards-projects">
                    {isFetching ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
                <ButtonSeeAllBack to="/#public-lb" as={HashLink}>
                    VOLTAR
                </ButtonSeeAllBack>
            </div>
        </AllPublicBooksContainer>
    )
}

export default AllPublicBooks
