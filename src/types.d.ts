declare interface Books {
    link: string
    title: string
    descBooks: string
    photo: string
    id?: number
    price: number
}

type CreditsValues = {
    id: number
    store_book_id: number
    type: string
    person: string
}

declare interface BooksPurchase extends Omit<Books, 'link' | 'descBooks'> {
    summary: string
    isbn: string
    pageQuant: string
    tags: string
    width: string
    store_books_credits: CreditsValues[]
}

declare interface BooksCart
    extends Omit<Books, 'link' | 'title' | 'descBooks' | 'id'> {
    quant: number
    name: string
    id?: number
}
