import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9001/',
    }),
    endpoints: (builder) => ({
        getPublicBooks: builder.query<Books[], void>({
            query: () => 'public-books'
        }),
        getStoreBooks: builder.query<Books[], void>({
            query: () => 'store-books'
        }),
        getItemsCart: builder.query<BooksCart, void>({
            query: () => ({
                url: 'cartItems',
                credentials: 'include'
            })
        }),
        getRemoveItem: builder.mutation<void, string>({
            query: (itemId) => ({
                url: `removeItem/${itemId}`,
                credentials: 'include',
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetPublicBooksQuery,
    useGetStoreBooksQuery,
    useGetItemsCartQuery,
    useGetRemoveItemMutation
} = api
export default api
