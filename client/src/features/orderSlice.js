import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    loading: true,
    error: false,
    orders: null,
    userOrders:null,
    order: null,
    cartItems:[],
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

    addCartItem: (state, { payload }) => {
      state.cartItems = [...state.cartItems, payload];
      state.numItemsInCart += payload.amount;
      state.cartTotal += payload.amount * payload.price;
      console.log("cartItems:", state.cartItems);
      console.log("numItemsInCart", state.numItemsInCart);
      console.log("state.cartTotal", state.cartTotal);
    },
    removeCartItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((items)=>{
       return items._id !== payload._id;
      })
      state.numItemsInCart -= payload.amount;
      state.cartTotal -= payload.amount * payload.price;
      console.log("cartItems:", state.cartItems);
      console.log("numItemsInCart", state.numItemsInCart);
      console.log("state.cartTotal", state.cartTotal);
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
  addCartItem,
  removeCartItem,
} = orderSlice.actions;
export default orderSlice.reducer;
