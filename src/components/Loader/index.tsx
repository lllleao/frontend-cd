import { BeatLoader, ClipLoader } from 'react-spinners'
import { Container } from './styles'

type LoaderProps = {
    isCircle?: boolean
}
const Loader = ({ isCircle }: LoaderProps) => {
    if (isCircle) {
        return (
            <Container $isCircle>
                <ClipLoader size={32} className="spinners" color="#fff" />
            </Container>
        )
    }

    return (
        <Container>
            <BeatLoader size={22} className="spinners" color="#fff" />
        </Container>
    )
}

export default Loader
