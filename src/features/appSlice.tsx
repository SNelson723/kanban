import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  // base of the api
  url: string;
}

const initialState: AppState = {
  url: 'https://localhost:44323/api/'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
export default appSlice.reducer