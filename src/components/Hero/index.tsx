import logo3 from '../../assets/logo-nova/logo3.png'
import { AnimationHero, HeroContainer } from './styles'

const Hero = () => {

    return (
        <HeroContainer id="hero" className="container">
            <img
                srcSet={logo3}
                alt="simbolo enigmático e estranahmente invasivo"
            />
            <AnimationHero>
                <h1>
                    <span className="span1">Cidade</span>
                    <span className="span2">Eclipse</span>
                </h1>
                <h2>uma cooperativa de artistas emergentes</h2>
            </AnimationHero>
        </HeroContainer>
    )
}

export default Hero
