declare interface Books {
    link: string
    title: string
    desc: string
    photo: string
    id?: number
    price: number
}

type CreditsValues = {
    type: string
    person: string
}

declare interface BooksPurchase extends Omit<Books, 'link' | 'desc'> {
    summary: string
    isbn: string
    pageQuant: string
    tags: string
    width: string
    credits: CreditsValues[]
}

declare interface BooksCart {
    items: [
        {
            price: number
            quant: number
            id?: string
            name: string
            photo: string
        }
    ]
}
