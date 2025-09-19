import logo3 from '@/assets/logo-nova/logo3.png'
import {
    AnimationHero,
    ButtonHero,
    Documentario,
    HeroContainer
} from './styles'

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
                    <ButtonHero>
                        <ul>
                            <li className="instagram button-borders">
                                <a
                                    href="https://www.instagram.com/cidadeclipse/"
                                    target="_blank"
                                    className="primary-button"
                                    rel="noreferrer"
                                >
                                    INSTAGRAM
                                </a>
                            </li>
                        </ul>
                    </ButtonHero>
                </AnimationHero>
            </HeroContainer>
            <Documentario className="container">
                <h3 className="documentario-title">
                    pseudocumentário-pseudocológico-N-81
                </h3>
                {/* <iframe
                    src="https://www.youtube.com/embed/nweBC3MMPIU"
                    title="Pseudocumentário-pseudocológico-N-81"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="iframe-doc"
                /> */}
            </Documentario>
        </>
    )
}

export default Hero
