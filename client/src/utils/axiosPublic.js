import axios from "axios";

const BASE_URL = "https://nodetasktracker.onrender.com/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});