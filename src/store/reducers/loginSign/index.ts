import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EmailUser = {
    signUserExist?: boolean
    loginUserExist?: boolean
    passWordCorrect?: boolean
    msg?: string
    userId?: string
    loginSuccess?: boolean
    signSuccess?: boolean
}

const initialState: EmailUser = {
    loginSuccess: false
}

const loginSignSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        checkSignUser: (state, action: PayloadAction<EmailUser>) => {
            state.signUserExist = action.payload.signUserExist
            state.msg = action.payload.msg
            state.userId = action.payload.userId
            state.signSuccess = action.payload.signSuccess
        },
        checkLoginUser: (state, action: PayloadAction<EmailUser>) => {
            state.loginUserExist = action.payload.loginUserExist
            state.passWordCorrect = action.payload.passWordCorrect
            state.msg = action.payload.msg
            state.loginSuccess = action.payload.loginSuccess
        }
    }
})

export const { checkLoginUser, checkSignUser } = loginSignSlice.actions
export default loginSignSlice.reducer
