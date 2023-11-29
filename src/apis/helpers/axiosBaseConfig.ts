import axios from "axios";
import { BASE_API } from "@/constant";

import { httpErrorHandler } from "./httpErrorHandler";

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
    // const { errors } = error.response.data;
    // Object.keys(errors).map((item) => {
    //   if (errors[item]) {
    //     toast.error(errors[item]);
    //   }
    // });
    // console.log(errors);
    httpErrorHandler(error);
  }
);
// interceptors.setup(Api)
// interceptors.checkToken(Api)

export default API;
