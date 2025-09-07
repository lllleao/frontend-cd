export type CreditsValues = {
    id: number
    store_book_id: number
    type: string
    person: string
}

export type itemsOrder = {
    name: string
    photo: string
    price: number
    quant: number
}

export type DataOrder = {
    totalPrice: number
    createdAt: Date
    items: itemsOrder[]
}

export type User = {
    email: string
    name: string
    dataPurchase: DataOrder[]
}

export type DataSignupProp = {
    data: {
        name: string
        email: string
        password: string
    }
    csrfToken: string
}

export type BooksCart = {
    items: [
        {
            price: number
            quant: number
            name: string
            photo: string
        }
    ]
    csrfToken: string
}

export type GetBooksCart = {
    items: [
        {
            price: number
            quant: number
            id?: number
            name: string
            photo: string
        }
    ]
}

export type CsrfProp = {
    csrfToken: string
}

export type EmailDataProp = {
    csrfToken: string
    data: {
        emailUser: string
        text: string
        name: string
        phone?: string
    }
}

export type UpdatePrice = {
    data: {
        quantBefore: number
        quantCurrent: number
        idItem: number | undefined
        price: number
    }
    csrfToken: string
}

export type TotalPriceProps = {
    totalPrice: number
}

export type ItemsInfo = {
    price: number
    quant: number
    id?: number
    name: string
    photo: string
}

export type PixDatProps = {
    pixData: {
        qrcode: string
        imagemQrcode: string
        linkVisualizacao: string
    }
}
