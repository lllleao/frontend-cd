import { configureStore } from '@reduxjs/toolkit'
import loginSiginReducer from './reducers/loginSign'
import api from '../services/api'

const store = configureStore({
    reducer: {
        loginSigin: loginSiginReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
