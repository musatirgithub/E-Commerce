import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",

  initialState: {
    loading: true,
    error: false,
    reviews: null,
    userReviews:null,
    review: null,
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

    getReviewsSuccess: (state, { payload }) => {
      state.loading = false;
      state.reviews = payload;
    },
    getUserReviewsSuccess: (state, { payload }) => {
      state.loading = false;
      state.userReviews = payload;
    },
    getSingleReviewSuccess: (state, { payload }) => {
      state.loading = false;
      state.review = payload;
    },
    getSingleReviewFail: (state) => {
      state.loading = false;
      state.review = null;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
      state.reviews = null;
    },
  },
});

export const {
  fetchStart,
  getReviewsSuccess,
  getUserReviewsSuccess,
  getSingleReviewSuccess,
  getSingleReviewFail,
  fetchFail,
} = reviewSlice.actions;
export default reviewSlice.reducer;
