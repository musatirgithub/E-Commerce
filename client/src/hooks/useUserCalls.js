import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchStart,
  updatePasswordSuccess,
  fetchFail,
} from "../features/userSlice";
import {axiosPublic} from "../utils/axiosPublic";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useTaskCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePassword = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.patch("/api/v1/user/update-user-password", userInfo, {withCredentials:'include'});
      dispatch(updatePasswordSuccess());
      toastSuccessNotify(data.msg);
      navigate('/');
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg)
    }
  };
 
  return {
    updatePassword,
  };
};

export default useTaskCalls;
