import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EmailUser } from '../store/reducers/loginSign'

export type User = {
    email: string
    name: string,
    dataPurchase: DataOrder[]
}

type DataOrder = {
    totalPrice: number,
    createdAt: Date,
    items: itemsOrder[]
}

type itemsOrder = {
    name: string,
    photo: string,
    price: number,
    quant: number
}

type DataProp = {
    name?: string
    email: string
    password: string
}

type BooksCart = {
    items: [
        {
            price: number
            quant: number
            name: string
            photo: string
        }
    ]
}

type GetBooksCart = {
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

type CsrfProp = {
    csrfToken: string
}

type EmailDataProp = {
    csrfToken: string
    data: {
        emailUser: string
        text: string
        number: string
        name: string
    }
}

type UpdataPrice = {
    quantBefore: number
    quantCurrent: number
    idItem: number | undefined
    price: number
}

type TotalPriceProps = {
    totalPrice: number
}

type ItemsInfo = {
    price: number
    quant: number
    id?: number
    name: string
    photo: string
}

type PurchaseDataProps = {
    name: string
    cpf: string
    cep: string
    street: string
    neighborhood: string
    complement: string
    number: string
    itemsInfo: ItemsInfo[]
    totalPrice: number
}

type PixDatProps = {
    pixData: {
        qrcode: string
        imagemQrcode: string
        linkVisualizacao: string
    }
}

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9001/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCookie: builder.mutation<string, void>({
            query: () => ({
                url: 'getCookie',
                method: 'GET'
            })
        }),
        getCSRFToken: builder.query<CsrfProp, void>({
            query: () => 'csrf-token'
        }),
        getTotalPrice: builder.query<TotalPriceProps, void>({
            query: () => 'totalPrice'
        }),
        sendEmail: builder.mutation<void, EmailDataProp>({
            query: (emailData) => ({
                url: 'api/send',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': emailData.csrfToken
                },
                body: emailData.data
            })
        }),
        getPublicBooks: builder.query<Books[], void>({
            query: () => 'public-books'
        }),
        getStoreBooks: builder.query<Books[], void>({
            query: () => 'store-books'
        }),
        getSpecificStoreBook: builder.query<BooksPurchase, string>({
            query: (id) => `store-books/${id}`
        }),
        getItemsCart: builder.query<GetBooksCart, void>({
            query: () => ({
                url: 'cartItems'
            })
        }),
        getProfileData: builder.query<User, void>({
            query: () => ({
                url: 'profile'
            })
        }),
        getRemoveItem: builder.mutation<void, string>({
            query: (name) => ({
                url: `removeItem/${name}`,
                method: 'DELETE'
            })
        }),
        loginUser: builder.mutation<EmailUser, DataProp>({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
        }),
        signUser: builder.mutation<EmailUser, DataProp>({
            query: (data) => ({
                url: 'create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
        }),
        addToCart: builder.mutation<void, BooksCart>({
            query: (data) => ({
                url: 'addCart',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data.items[0]
            })
        }),
        updataPrice: builder.mutation<void, UpdataPrice>({
            query: (updataData) => ({
                url: 'updataPrice',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: updataData
            })
        }),
        purchaseData: builder.mutation<PixDatProps, PurchaseDataProps>({
            query: (purchaseData) => ({
                url: 'purchase',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: purchaseData
            })
        })
    })
})

export const {
    useGetPublicBooksQuery,
    useGetStoreBooksQuery,
    useGetItemsCartQuery,
    useGetRemoveItemMutation,
    useGetCookieMutation,
    useGetProfileDataQuery,
    useLoginUserMutation,
    useSignUserMutation,
    useAddToCartMutation,
    useGetSpecificStoreBookQuery,
    useGetCSRFTokenQuery,
    useSendEmailMutation,
    useUpdataPriceMutation,
    useGetTotalPriceQuery,
    usePurchaseDataMutation
} = api
export default api
