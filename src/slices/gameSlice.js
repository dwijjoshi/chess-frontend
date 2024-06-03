import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeGameType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { changeGameType } = gameSlice.actions;
export default gameSlice.reducer;
