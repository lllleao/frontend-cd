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

declare interface BooksPurchase extends Omit<BooksFromStore, 'descBooks'> {
    summary: string
    isbn: string
    pageQuant: string
    tags: string
    width: string
    store_books_credits: CreditsValues[]
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
