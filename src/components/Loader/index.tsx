import { BeatLoader } from 'react-spinners'
import { Container } from './styles'

const Loader = () => {
    return (
        <Container>
            <BeatLoader size={22} className="spinners" color="#fff" />
        </Container>
    )
}

export default Loader
