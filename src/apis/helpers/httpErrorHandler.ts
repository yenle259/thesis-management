import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function httpErrorHandler(error: Error) {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");

  if (axios.isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error?.response;
    const request = error?.request;

    //here we have access the config used to make the api call (we can make a retry using this conf)
    const config = error?.config;

    if (error.code === "ERR_NETWORK") {
      // console.log("connection problems..");
      toast.error("Lỗi kết nối");
    } else if (error.code === "ERR_CANCELED") {
      // console.log("connection canceled..");
      toast.error("Kết nối bị hủy...");
    }

    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status;
      if (statusCode === 404) {
        // console.log(
        //   "The requested resource does not exist or has been deleted"
        // );
        toast.error("Không tìm thấy đường dẫn truy cập");
      } else if (statusCode === 401) {
        // console.log("Please login to access this resource");
        toast.error("Cần đăng nhập để truy cập tài nguyên");
      } else if (statusCode === 400) {
        const { errors } = response.data;
        Object.keys(errors).map((item) => {
          if (errors[item]) {
            toast.error(errors[item]);
          }
        });
        return errors;
      }
    } else if (request) {
      //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
    }
  }
  //Something happened in setting up the request and triggered an Error
  console.log(error.message);
}
