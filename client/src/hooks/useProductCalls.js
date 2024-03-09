// import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import {tokenTimeout} from "../features/authSlice";
import {
  fetchStart,
  getProductsSuccess,
  getSingleProductSuccess,
  fetchFail,
} from "../features/productSlice";
import {axiosPublic} from "../utils/axiosPublic";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useProductCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getAllProducts = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosPublic.get("/api/v1/task/all-tasks", {withCredentials:'include'});
  //     dispatch(getProductsSuccess(data.products));
  //   } catch (err) {
  //     dispatch(fetchFail());
  //   }
  // };
  const getAllProducts = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/product/all-products", {withCredentials:'include'});
      dispatch(getProductsSuccess(data.products));
    } catch (err) {
      dispatch(fetchFail());
      // if(err?.response?.status === 401){
      //   dispatch(tokenTimeout());
      //   toastErrorNotify("Login required!")
      //     navigate('/login')
      // }
    }
  };
  const getProducts = async (formData) => {
    const {search, minprice, maxprice, minrating, maxrating, company, sort} = formData
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`/api/v1/product/?search=${search}&minprice=${minprice}&maxprice=${maxprice}&minrating=${minrating}&maxrating=${maxrating}&company=${company}&sort=${sort}`, {withCredentials:'include'});
      dispatch(getProductsSuccess(data.products));
    } catch (err) {
      dispatch(fetchFail());
      // if(err?.response?.status === 401){
      //   dispatch(tokenTimeout());
      //   toastErrorNotify("Login required!")
      //     navigate('/login')
      // }
    }
  };
  const createProduct = async (taskInfo) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.post(`/api/v1/product/`, taskInfo, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      await getAllProducts();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const deleteProduct = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.delete(`/api/v1/product/${id}`, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      await getAllProducts();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const getProduct = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.get(`/api/v1/product/${id}`, {withCredentials:'include'});
      dispatch(getSingleProductSuccess(data.product));
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const updateProduct = async (productInfo, id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.patch(`/api/v1/product/${id}`, productInfo, {withCredentials:'include'});
      getSingleProductSuccess(data.product);
      toastSuccessNotify(data.msg);
      await getAllProducts();
      await getProduct(id);
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };


  return {
    getAllProducts,
    getProducts,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
  };
};

export default useProductCalls;
