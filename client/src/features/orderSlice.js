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
    address:null,
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    clientSecret:null,
    isOrderedByUser:null,
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
    deleteOrderSuccess: (state)=>{
      state.loading = false;
    },
    setClientSecret: (state, {payload})=>{
      state.clientSecret = payload;
    },

    addCartItem: (state, { payload }) => {
      const { product } = payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === product.product
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
      state.tax +=  product.amount * product.price * 0.05;
      state.shipping = 750;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
    },

    removeCartItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item.product !== payload;
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
    },

    increaseCartItem: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (item) => item.product === payload
      );

      if (selectedItem) {
        // Product already exists in the cart, update the quantity
        selectedItem.amount += 1;

        state.numItemsInCart += 1;
        state.cartTotal += selectedItem.price;
        state.tax = state.cartTotal * 0.05;
        state.shipping = 750;
        state.orderTotal = state.cartTotal + state.tax + state.shipping;
      } 
    },

    decreaseCartItem: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (item) => item.product === payload
      );

      if (selectedItem) {
        // Product already exists in the cart, update the quantity
        if(selectedItem.amount > 1){
          selectedItem.amount -= 1;
          state.numItemsInCart -= 1;
          state.cartTotal -= selectedItem.price;
          state.tax = state.cartTotal * 0.05;
          state.shipping = 750;
          state.orderTotal = state.cartTotal + state.tax + state.shipping;
        }
      } 
    },

    addAddress:(state, {payload})=>{
      state.address = payload
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    isOrderedByUserSuccess:(state)=>{
      state.isOrderedByUser = true;
    },
    isOrderedByUserFail:(state)=>{
      state.isOrderedByUser = false;
    },
  },
});

export const {
  fetchStart,
  getOrdersSuccess,
  getUserOrdersSuccess,
  getSingleOrderSuccess,
  deleteOrderSuccess,
  fetchFail,
  addCartItem,
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
  addAddress,
  setClientSecret,
  isOrderedByUserSuccess,
  isOrderedByUserFail,
} = orderSlice.actions;
export default orderSlice.reducer;
