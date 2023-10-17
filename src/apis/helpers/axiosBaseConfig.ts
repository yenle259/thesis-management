import axios from "axios";
import { BASE_API } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const API = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000, // request timeout
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // toast.error(error);
    console.log(error);
  }
);
// interceptors.setup(Api)
// interceptors.checkToken(Api)

export default API;
