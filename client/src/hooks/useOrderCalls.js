import { useDispatch } from "react-redux";

import {
  fetchStart,
  getOrdersSuccess,
  getUserOrdersSuccess,
  getSingleOrderSuccess,
  fetchFail,
  setClientSecret,
} from "../features/orderSlice";
import { axiosPublic } from "../utils/axiosPublic";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useOrderCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getOrders = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/order/", {
        withCredentials: "include",
      });
      dispatch(getOrdersSuccess(data.orders));
    } catch (err) {
      dispatch(fetchFail());

    }
  };
  const getUserOrders = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/order/", {
        withCredentials: "include",
      });
      dispatch(getUserOrdersSuccess(data.orders));
    } catch (err) {
      dispatch(fetchFail());
    }
  };
  const createOrder = async (orderInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post(`/api/v1/order/`, orderInfo, {
        withCredentials: "include",
      });
      toastSuccessNotify(data?.msg);
      dispatch(setClientSecret(data?.clientSecret));
      // await getOrders();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const deleteOrder = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.delete(`/api/v1/order/${id}`, {
        withCredentials: "include",
      });
      toastSuccessNotify(data.msg);
      // await getOrders();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const getOrder = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`/api/v1/order/${id}`, {
        withCredentials: "include",
      });
      dispatch(getSingleOrderSuccess(data.order));
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const updateOrder = async (orderInfo, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.patch(
        `/api/v1/order/${id}`,
        orderInfo,
        { withCredentials: "include" }
      );
      getSingleOrderSuccess(data.order);
      toastSuccessNotify(data.msg);
      await getOrders();
      await getOrder(id);
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };


  return {
    // getAllTasks,
    getOrders,
    createOrder,
    deleteOrder,
    getOrder,
    updateOrder,
  };
};

export default useOrderCalls;
