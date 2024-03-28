// import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";

import {
  fetchStart,
  getReviewsSuccess,
  getUserReviewsSuccess,
  getSingleReviewSuccess,
  fetchFail,
} from "../features/reviewSlice";
import useProductCalls from "./useProductCalls";
import {axiosPublic} from "../utils/axiosPublic";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useReviewCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {getProduct} = useProductCalls();

  // const getAllProducts = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosPublic.get("/api/v1/task/all-tasks", {withCredentials:'include'});
  //     dispatch(getProductsSuccess(data.products));
  //   } catch (err) {
  //     dispatch(fetchFail());
  //   }
  // };
  const getReviews = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/review/all-reviews", {withCredentials:'include'});
      dispatch(getReviewsSuccess(data.reviews));
    } catch (err) {
      dispatch(fetchFail());
      // if(err?.response?.status === 401){
      //   dispatch(tokenTimeout());
      //   toastErrorNotify("Login required!")
      //     navigate('/login')
      // }
    }
  };
  const getUserReviews = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/review/", {withCredentials:'include'});
      dispatch(getUserReviewsSuccess(data.reviews));
    } catch (err) {
      dispatch(fetchFail());
    }
  };
  const createReview = async (reviewInfo) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.post(`/api/v1/review/`, reviewInfo, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      // await getOrders();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const deleteReview = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.delete(`/api/v1/review/${id}`, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      // await getOrders();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const getReview = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.get(`/api/v1/review/${id}`, {withCredentials:'include'});
      dispatch(getSingleReviewSuccess(data.review));
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const updateReview = async (reviewInfo, id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.patch(`/api/v1/review/${id}`, reviewInfo, {withCredentials:'include'});
      getSingleReviewSuccess(data.review);
      toastSuccessNotify(data.msg);
      await getReviews();
      await getReview(reviewInfo.product);
      await getProduct(reviewInfo.product);
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };


  return {
    getReviews,
    getUserReviews,
    createReview,
    deleteReview,
    getReview,
    updateReview,
  };
};

export default useReviewCalls;
