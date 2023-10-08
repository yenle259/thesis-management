import axios from "axios";
import { BASE_API } from "@/constant";

const API = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000, // request timeout
});

// interceptors.setup(Api)
// interceptors.checkToken(Api)

export default API;
