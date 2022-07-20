import axios from "axios";
import { refreshTokenApi } from "../api/auth.apiRequest";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/v1/api",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.response.use((response) => {
  const {code}=response.data
  if(code===403){
    return refreshTokenApi().then(rs => {
      // console.log("rs ::: ",rs)
      const {newAccessToken } = rs.data
      window.localStorage.setItem('accessToken',newAccessToken)
      const config = response.config
      config.headers['authorization'] = newAccessToken
      config.baseURL = 'http://localhost:5000/v1/api'
      return axiosConfig(config)
  })
  }
  return response
});
export default axiosConfig;
