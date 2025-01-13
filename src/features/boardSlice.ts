import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../types';

export interface BoardState {
  name: string;
  boards: Board[]
}

const initialState: BoardState = {
  name: '',
  boards: []
}

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setBoards } = boardSlice.actions;
export default boardSlice.reducer