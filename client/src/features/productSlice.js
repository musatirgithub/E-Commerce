import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    loading: true,
    error: false,
    products: null,
    minPrice:null,
    maxPrice:null,
    product: null,
    isModalOpen:false,
    isSidebarOpen: false,
    imageAddress:null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    imageUpload:(state, {payload})=>{
      state.imageAddress = payload;
    },
    imageUploadFail:(state)=>{
      state.imageAddress = null;
    },

    getProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      let minPrice = 1000000;
      let maxPrice = 0;
      state.products.forEach((item) => {
        if(item.price < minPrice){minPrice = item.price};
        if(item.price > maxPrice){maxPrice = item.price};
      });
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
    getSingleProductSuccess: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    editProductSuccess: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.imageAddress = null;
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
  editProductSuccess,
  imageUpload,
  imageUploadFail,
  fetchFail,
  openModal,
  closeModal,
  openSidebar,
  closeSidebar,
} = productSlice.actions;
export default productSlice.reducer;
