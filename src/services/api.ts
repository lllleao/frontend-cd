import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataProp } from '../components/LoginSign/formsFetch'
import { EmailUser } from '../store/reducers/loginSign'

type User = {
    email: string
    id: string
    name: string
}

type CsrfProp = {
    csrfToken: string
}

type EmailDataProp = {
    csrfToken: string,
    data: {
        emailUser: string;
        text: string;
        number: string;
        name: string;
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
        getItemsCart: builder.query<BooksCart, void>({
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
            query: (itemId) => ({
                url: `removeItem/${itemId}`,
                method: 'DELETE'
            })
        }),
        loginUser: builder.mutation<EmailUser, DataProp>({
            query: (data) => (
                {
                    url: 'login',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                }
            )
        }),
        signUser: builder.mutation<EmailUser, DataProp>({
            query: (data) => (
                {
                    url: 'create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                }
            )
        }),
        addToCart: builder.mutation<void, BooksCart>({
            query: (data) => (
                {
                    url: 'addCart',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data.items[0]
                }
            )
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
    useSendEmailMutation
} = api
export default api
