import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  timeSeconds: 60,
  timeMinutes: 10,
  timeOppSeconds: 60,
  timeOppMinutes: 10,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeGameType: (state, action) => {
      state.type = action.payload;
    },
    decrementSeconds: (state) => {
      state.timeSeconds = state.timeSeconds--;
    },
    decrementMinutes: (state) => (state.timeMinutes -= state.timeMinutes),

    decrementOppSeconds: (state) =>
      (state.timeOppSeconds -= state.timeOppSeconds),

    decrementOppMinutes: (state) =>
      (state.timeOppMinutes -= state.timeOppMinutes),
  },
});

export const {
  changeGameType,
  decrementSeconds,
  decrementMinutes,
  decrementOppSeconds,
  decrementOppMinutes,
} = gameSlice.actions;
export default gameSlice.reducer;
