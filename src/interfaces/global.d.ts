declare interface Books {
    link: string
    title: string
    descBooks: string
    photo: string
    id?: number
}

declare interface BooksFromStore extends Omit<Books, 'link'> {
    price: number
}

interface CreateAddressProps {
    csrfToken: string
    data: {
        name: string
        cpf: string
        zipCode: string
        street: string
        neighborhood: string
        complement: string
        number: string
        isDefault: boolean
    }
}
