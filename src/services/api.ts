import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataProp } from '../components/LoginSign/formsFetch'
import { EmailUser } from '../store/reducers/loginSign'

type User = {
    email: string
    id: string
    name: string
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
        getPublicBooks: builder.query<Books[], void>({
            query: () => 'public-books'
        }),
        getStoreBooks: builder.query<Books[], void>({
            query: () => 'store-books'
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
    useAddToCartMutation
} = api
export default api
