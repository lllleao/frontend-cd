import logo3 from '../../assets/logo-nova/logo3.png'
import documentario from '../../assets/documentario/documentario.jpg'
import { AnimationHero, Documentario, HeroContainer, Watch } from './styles'

const Hero = () => {
    
    return (
        <>
            <HeroContainer id="hero" className="container">
                <img
                    className="logo3"
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
            <Documentario className="container">
                <img srcSet={documentario} alt="capa documentario" />
                <h3 className="documentario-title">
                    pseudocumentário-pseudocológico-N-81
                </h3>
                <Watch>Assista!</Watch>
            </Documentario>
        </>
    )
}

export default Hero
