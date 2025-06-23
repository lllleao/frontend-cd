import { FooterContainer } from './styles'

const Footer = () => {
    return (
        <FooterContainer>
            <div className="container">
                <ul className="footer-list">
                    <li className="footer-list__item">
                        <a className="footer-list__item__link" href="">HOME</a>
                    </li>
                    <li className="footer-list__item">
                        <a className="footer-list__item__link" href="">BIBLIOTECA VIRTUAL</a>
                    </li>
                    <li className="footer-list__item">
                        <a className="footer-list__item__link" href="">LOJINHA</a>
                    </li>
                    <li className="footer-list__item">
                        <a className="footer-list__item__link" href="">FALE CONOSCO</a>
                    </li>
                </ul>
                <p className='copy-right'>Todos os direitos reservados - Fortaleza CE &copy;</p>
            </div>
        </FooterContainer>
    )
}

export default Footer
