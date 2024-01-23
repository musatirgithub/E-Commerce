import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    loading: true,
    error: false,
    orders: null,
    userOrders:null,
    order: null,
    cartItems:[{
      name:"",
      image:"",
      price:0,
      amount:0,
      product:"",
    }],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
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

    getOrdersSuccess: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
    },
    getUserOrdersSuccess: (state, { payload }) => {
      state.loading = false;
      state.userOrders = payload;
    },
    getSingleOrderSuccess: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getOrdersSuccess,
  getUserOrdersSuccess,
  getSingleOrderSuccess,
  fetchFail,
} = orderSlice.actions;
export default orderSlice.reducer;
