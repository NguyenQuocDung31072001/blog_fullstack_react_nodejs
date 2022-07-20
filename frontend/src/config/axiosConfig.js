import axios from "axios";
import { refreshToken } from "../redux/accountSlices";
import { useDispatch } from "react-redux";

const refreshAccessToken=async ({dispatch,newAccessToken})=>{
try {
    const res=await axiosConfig.post('')
} catch (error) {
    
}
}
const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/v1/api",
});

axiosConfig.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        console.log("alo alo refresh token de!")
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;
