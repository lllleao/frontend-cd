import Header from '../../containers/Header'
import FormAddress from '../FormAddress'
import { AddressEditContainer } from './styles'

const AddressEdit = () => {
    return (
        <>
            <AddressEditContainer>
                <Header />
                <FormAddress />
            </AddressEditContainer>
        </>
    )
}

export default AddressEdit
