import { DataSignupProp, ItemsInfo } from '@/types/types'

export interface DataLoginProp {
    data: Omit<DataSignupProp['data'], 'name'>
    csrfToken: string
}

export interface PurchaseDataProps {
    itemsInfo: ItemsInfo[]
    addressId: number
    csrfToken: string
}

export interface GetAddressProps {
    name: string
    cpf: string
    zipCode: string
    street: string
    neighborhood: string
    complement: string
    number: string
    isDefault: boolean
    id?: number
}
