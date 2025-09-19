import { CreditsValues, DataSignupProp, ItemsInfo } from '@/types/types'

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

export interface BooksPurchaseInterface
    extends Omit<BooksFromStore, 'descBooks'> {
    summary: string
    pageQuant: string
    tags: string
    synopsis: string
    stock: number
    author: string
    store_books_credits: CreditsValues[]
}
