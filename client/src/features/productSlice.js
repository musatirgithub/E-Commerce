import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    loading: true,
    error: false,
    products: null,
    product: null,
    isModalOpen:false,
    isSidebarOpen: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // getSuccess: (state, { payload: { data, url } }) => {
    //   state.loading = false;
    //   state[url] = data;
    // },

    getProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = payload;
    },
    getSingleProductSuccess: (state, { payload }) => {
      state.loading = false;
      state.task = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const {
  fetchStart,
  getProductsSuccess,
  getSingleProductSuccess,
  fetchFail,
  openModal,
  closeModal,
  openSidebar,
  closeSidebar,
} = productSlice.actions;
export default productSlice.reducer;
