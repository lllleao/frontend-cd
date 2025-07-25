import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type EmailUser = {
    success?: EmailUser | undefined
    signUserExist?: boolean
    loginUserExist?: boolean
    passWordCorrect?: boolean
    msg?: string
    loginSuccess?: boolean
    signSuccess?: boolean
    missToken?: boolean
}

const initialState: Omit<EmailUser, 'success'> = {
    loginSuccess: false
}

const loginSignSlice = createSlice({
    name: 'loginSign',
    initialState,
    reducers: {
        checkSignUser: (state, action: PayloadAction<EmailUser>) => {
            state.signUserExist = action.payload.signUserExist
            state.msg = action.payload.msg
            state.signSuccess = action.payload.signSuccess
            state.missToken = action.payload.missToken
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
