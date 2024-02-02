import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    loading: true,
    error: false,
    orders: null,
    userOrders: null,
    order: null,
    cartItems: [],
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
      const { product } = payload;
      const existingItem = state.cartItems.find(
        (item) => item.productID === product.productID
      );

      if (existingItem) {
        // Product already exists in the cart, update the quantity
        existingItem.amount += Number(product.amount);
      } else {
        // Product doesn't exist in the cart, add a new item
        state.cartItems = [...state.cartItems, product];
      }

      state.numItemsInCart += Number(product.amount);
      state.cartTotal += product.amount * product.price;
      state.tax += state.cartTotal * 0.05;
      state.shipping = 750;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
    },

    removeCartItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((items) => {
        return items._id !== payload._id;
      });
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.cartItems.forEach((item) => {
        state.numItemsInCart += item.amount;
        state.cartTotal += item.amount * item.price;
      });

      state.tax = state.cartTotal * 0.05;
      state.cartItems.length > 0 ? state.shipping = 750 : state.shipping = 0;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;

      console.log("cartItems:", state.cartItems);
      // console.log("numItemsInCart", state.numItemsInCart);
      // console.log("state.cartTotal", state.cartTotal);
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
