import Contact from '../../components/Contact'
import Hero from '../../components/Hero'
import PublicLib from '../../components/PublicLib'
import Purchase from '../../components/Purchase'
import { MainContainer } from './styles'

const Main = () => {

    return (
        <MainContainer>
            <Hero />
            <PublicLib />
            <Purchase />
            <Contact />
        </MainContainer>
    )
}

export default Main
