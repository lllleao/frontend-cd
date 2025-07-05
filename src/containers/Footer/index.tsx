import { FooterContainer } from './styles'
import { HashLink } from 'react-router-hash-link'

const Footer = () => {
    return (
        <FooterContainer>
            <div className="container">
                <ul className="footer-list">
                    <li className="footer-list__item">
                        <HashLink className="footer-list__item__link" to="/#hero">HOME</HashLink>
                    </li>
                    <li className="footer-list__item">
                        <HashLink className="footer-list__item__link" to="/#public-lb">BIBLIOTECA VIRTUAL</HashLink>
                    </li>
                    <li className="footer-list__item">
                        <HashLink className="footer-list__item__link" to="/#purchase">LOJINHA</HashLink>
                    </li>
                    <li className="footer-list__item">
                        <HashLink className="footer-list__item__link" to="/#contact-us">FALE CONOSCO</HashLink>
                    </li>
                </ul>
                <p className='copy-right'>Todos os direitos reservados - Fortaleza CE &copy;</p>
            </div>
        </FooterContainer>
    )
}

export default Footer
