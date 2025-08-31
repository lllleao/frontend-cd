import { configureStore } from '@reduxjs/toolkit'
import loginSiginReducer from './reducers/loginSign'
import cartReducer from './reducers/cart'
import api from '@/services/api'

const store = configureStore({
    reducer: {
        loginSigin: loginSiginReducer,
        cart: cartReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
