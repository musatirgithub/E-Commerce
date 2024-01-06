import axios from "axios";

const BASE_URL = "http://localhost:5000/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});