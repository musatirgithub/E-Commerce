import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    role: null,
    loading: true,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.user?.name;
      state.role = payload?.user?.role;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = null;
      state.role = null;
    },
    validationSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    tokenTimeout: (state) => {
      state.currentUser = null;
      state.role = null;
    }
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  validationSuccess,
  fetchFail,
  tokenTimeout,
} = authSlice.actions;
export default authSlice.reducer;
