import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartSlice = {
    numberCart: number
}


const initialState:CartSlice = {
    numberCart: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateNumberCart: (state, action: PayloadAction<number>) => {
            state.numberCart = action.payload
        }
    }
})

export const { updateNumberCart } = cartSlice.actions
export default cartSlice.reducer
