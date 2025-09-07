import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EmailUser } from '@/store/reducers/loginSign'
import {
    BooksCart,
    CsrfProp,
    DataSignupProp,
    EmailDataProp,
    GetBooksCart,
    PixDatProps,
    TotalPriceProps,
    UpdatePrice,
    User
} from '@/types/types'
import {
    DataLoginProp,
    GetAddressProps,
    PurchaseDataProps
} from '@/interfaces/interfaces'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCookie: builder.mutation<boolean, string>({
            query: (data) => ({
                url: 'auth/get-cookie',
                method: 'GET',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        getCSRFToken: builder.mutation<string, void>({
            query: () => ({
                url: 'auth/get-csrfToken',
                method: 'POST'
            })
        }),
        verifyCSRFToken: builder.mutation<object, string>({
            query: (data) => ({
                url: 'auth/verify-csrfToken',
                method: 'POST',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        refreshToken: builder.mutation<object, string>({
            query: (data) => ({
                url: 'auth/refresh',
                method: 'POST',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        getTotalPrice: builder.query<TotalPriceProps, string>({
            query: (csrfToken) => ({
                url: 'cart/total-price',
                headers: {
                    'csrf-token': csrfToken
                }
            })
        }),
        sendEmail: builder.mutation<void, EmailDataProp>({
            query: (emailData) => ({
                url: 'email/send',
                method: 'POST',
                headers: {
                    'csrf-token': emailData.csrfToken
                },
                body: emailData.data
            })
        }),
        getPublicBooks: builder.query<
            Books[],
            { take?: number; skip?: number }
        >({
            query: ({ skip, take }) => {
                return `books/free?take=${take}&skip=${skip}`
            }
        }),
        getPublicBooksLength: builder.query<Books[], void>({
            query: () => 'books/free-length'
        }),
        getStoreBooks: builder.query<BooksFromStore[], void>({
            query: () => 'books/store'
        }),
        getSpecificStoreBook: builder.query<BooksPurchase, string>({
            query: (id) => `books/store/${id}`
        }),
        getItemsCart: builder.query<GetBooksCart, string>({
            query: (data) => ({
                url: 'cart/items',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        getProfileData: builder.query<User, string>({
            query: (data) => ({
                url: 'user/profile',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        getRemoveItem: builder.mutation<
            void,
            { id: number; csrfToken: string }
        >({
            query: (data) => ({
                url: `cart/delete/${data.id}`,
                method: 'DELETE',
                headers: {
                    'csrf-token': data.csrfToken
                }
            })
        }),
        loginUser: builder.mutation<EmailUser, DataLoginProp>({
            query: (data) => ({
                url: 'user/login',
                method: 'POST',
                headers: {
                    'csrf-token': data.csrfToken
                },
                body: data.data
            })
        }),
        createAddress: builder.mutation<void, CreateAddressProps>({
            query: (dataCreateAddress) => ({
                url: 'user/create-address',
                method: 'POST',
                headers: {
                    'csrf-token': dataCreateAddress.csrfToken
                },
                body: {
                    data: {
                        name: dataCreateAddress.data.name,
                        cpf: dataCreateAddress.data.cpf,
                        zipCode: dataCreateAddress.data.zipCode,
                        street: dataCreateAddress.data.street,
                        neighborhood: dataCreateAddress.data.neighborhood,
                        complement: dataCreateAddress.data.complement,
                        number: dataCreateAddress.data.number,
                        isDefault: dataCreateAddress.data.isDefault
                    }
                }
            })
        }),
        getAddress: builder.query<GetAddressProps[], CsrfProp>({
            query: (data) => ({
                url: 'user/get-address',
                headers: {
                    'csrf-token': data.csrfToken
                }
            })
        }),
        signUser: builder.mutation<EmailUser, DataSignupProp>({
            query: ({ data: { email, password, name }, csrfToken }) => ({
                url: 'user/signup',
                method: 'POST',
                body: {
                    name,
                    password,
                    email
                },
                headers: {
                    'csrf-token': csrfToken
                }
            })
        }),
        logout: builder.mutation<void, string>({
            query: (data) => ({
                url: 'user/logout',
                method: 'POST',
                headers: {
                    'csrf-token': data
                }
            })
        }),
        addToCart: builder.mutation<void, BooksCart>({
            query: (data) => ({
                url: 'cart/add',
                method: 'POST',
                headers: {
                    'csrf-token': data.csrfToken
                },
                body: data.items[0]
            })
        }),
        updatePrice: builder.mutation<void, UpdatePrice>({
            query: (data) => ({
                url: 'cart/update-price',
                method: 'PATCH',
                headers: {
                    'csrf-token': data.csrfToken
                },
                body: data.data
            })
        }),
        purchaseData: builder.mutation<PixDatProps, PurchaseDataProps>({
            query: (purchaseData) => ({
                url: 'cart/create-purchase',
                method: 'POST',
                headers: {
                    'csrf-token': purchaseData.csrfToken
                },
                body: purchaseData.data
            })
        })
    })
})

export const {
    useLazyGetPublicBooksQuery,
    useGetPublicBooksLengthQuery,
    useVerifyCSRFTokenMutation,
    useLazyGetStoreBooksQuery,
    useGetStoreBooksQuery,
    useGetItemsCartQuery,
    useGetRemoveItemMutation,
    useGetCookieMutation,
    useLazyGetProfileDataQuery,
    useLoginUserMutation,
    useSignUserMutation,
    useAddToCartMutation,
    useLazyGetSpecificStoreBookQuery,
    useGetCSRFTokenMutation,
    useSendEmailMutation,
    useUpdatePriceMutation,
    useGetTotalPriceQuery,
    useLazyGetTotalPriceQuery,
    usePurchaseDataMutation,
    useLogoutMutation,
    useCreateAddressMutation,
    useLazyGetAddressQuery,
    useLazyGetItemsCartQuery,
    useRefreshTokenMutation,
    useGetProfileDataQuery
} = api
export default api
