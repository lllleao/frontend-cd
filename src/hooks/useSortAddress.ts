import { useProfileData } from './useProfileData'
import { GetAddressProps } from '@/interfaces/interfaces'

const useSortAddress = () => {
    const addressMock = useProfileData((state) => state.address)
    let defaultAddres: GetAddressProps
    let secondaryAddress: GetAddressProps

    const sortAddress = (
        address: GetAddressProps[] | undefined
    ): GetAddressProps[] => {
        if (!address) {
            return addressMock
        }

        defaultAddres = address.filter((item) => item.isDefault)[0]

        secondaryAddress = address.filter((item) => !item.isDefault)[0]

        if (!defaultAddres) {
            defaultAddres = addressMock[0]
        }

        if (!secondaryAddress) {
            secondaryAddress = addressMock[1]
        }

        const finalList = [defaultAddres, secondaryAddress] as GetAddressProps[]
        return finalList
    }

    return sortAddress
}

export default useSortAddress
