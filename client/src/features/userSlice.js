import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: null,
    loading: true,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateNameSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.name = payload?.name;
    },
    updatePasswordSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  updateNameSuccess,
  updatePasswordSuccess,
  fetchFail,
} = userSlice.actions;
export default userSlice.reducer;
