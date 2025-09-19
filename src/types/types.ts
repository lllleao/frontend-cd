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
    totalPrice: string
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
    items: {
        price: number
        quant: number
        name: string
        photo: string
        id: number
        stock: number
    }

    csrfToken: string
}

export type GetBooksCart = {
    items: {
        price: number
        quant: number
        id?: number
        name: string
        photo: string
        productId?: number
        stock: number
    }[]
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
        quantCurrent: number
        idItem: number | undefined
    }
    csrfToken: string
}

export type TotalPriceProps = {
    totalPrice: string
}

export type ItemsInfo = {
    price: number
    quant: number
    id?: number
    name: string
    photo: string
    productId?: number
}

export type PixDatProps = {
    qrCodeBase64: string
    copyPastePix: string
    status: string
}

export type PurchaseDone = {
    id: number
    buyerAddress: string
    totalPrice: number
    createdAt: string
    status: string
    items: {
        id: number
        name: 'David Friedrich [Pedro Monteiro]'
        photo: 'https://raw.githubusercontent.com/lllleao/servidor_estatico/main/david.jpg'
        quant: 1
    }[]
}
