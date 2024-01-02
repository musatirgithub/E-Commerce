import { useDispatch } from "react-redux";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  validationSuccess,
  fetchFail,
} from "../features/authSlice";
// import useTaskCalls from "../hooks/useTaskCalls";
import { axiosPublic } from "../utils/axiosPublic";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {getTasks} = useTaskCalls();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const {data}  = await axiosPublic.post("api/v1/auth/login", userInfo, {withCredentials: 'include'});
      dispatch(loginSuccess(data));
      // getTasks();
      toastSuccessNotify("Successfully logged in!");
        navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      const {data}= await axiosPublic.delete("api/v1/auth/logout", {withCredentials: 'include'});
      dispatch(logoutSuccess());
      toastSuccessNotify(data.msg);
      navigate("/login");
    } catch (err) {
      dispatch(fetchFail(err));
      toastErrorNotify(err.response.data.msg);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("api/v1/auth/register", userInfo, {withCredentials:'include'});
      toastSuccessNotify("Registered successfully!");
      navigate("/verify-email-warning");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };

  const verifyEmail = async (userInfo) => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("api/v1/auth/verify-email", userInfo);
      dispatch(validationSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  const forgotPassword = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/forgot-password", userInfo);
      navigate("/forgot-password-warning");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };

  const resetPassword = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/reset-password", userInfo);
      toastSuccessNotify(data.msg);
      navigate("/login");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };


  return {
    login,
    logout,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
  };
};

export default useAuthCalls;
