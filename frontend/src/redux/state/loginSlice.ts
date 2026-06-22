import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
  login_success: boolean
}

const initialState: LoginState | undefined = {
  login_success: false,
} 

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    success: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.login_success = true
    },
    failed: (state) => {
      console.log("Failed called")
      state.login_success = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { success, failed } = loginSlice.actions

export default loginSlice.reducer