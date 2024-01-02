// import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import {tokenTimeout} from "../features/authSlice";
import {
  fetchStart,
  getTasksSuccess,
  getSingleTaskSuccess,
  fetchFail,
} from "../features/taskSlice";
import {axiosPublic} from "../utils/axiosPublic";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useTaskCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllTasks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/task/all-tasks", {withCredentials:'include'});
      dispatch(getTasksSuccess(data.tasks));
    } catch (err) {
      dispatch(fetchFail());
    }
  };
  const getTasks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("/api/v1/task", {withCredentials:'include'});
      dispatch(getTasksSuccess(data.tasks));
    } catch (err) {
      dispatch(fetchFail());
      if(err?.response?.status === 401){
        dispatch(tokenTimeout());
        toastErrorNotify("Login required!")
          navigate('/login')
        
      }
    }
  };
  const createTask = async (taskInfo) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.post(`/api/v1/task/`, taskInfo, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      await getTasks();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const deleteTask = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.delete(`/api/v1/task/${id}`, {withCredentials:'include'});
      toastSuccessNotify(data.msg)
      await getTasks();
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const getTask = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.get(`/api/v1/task/${id}`, {withCredentials:'include'});
      dispatch(getSingleTaskSuccess(data.task));
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };
  const updateTask = async (taskInfo, id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.patch(`/api/v1/task/${id}`, taskInfo, {withCredentials:'include'});
      getSingleTaskSuccess(data.task);
      toastSuccessNotify(data.msg);
      await getTasks();
      await getTask(id);
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(err.response.data.msg);
    }
  };


  return {
    getAllTasks,
    getTasks,
    createTask,
    deleteTask,
    getTask,
    updateTask,
  };
};

export default useTaskCalls;
