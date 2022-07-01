import axios from "axios";

const axiosConfig=axios.create({
    baseURL:"http://localhost:5000/v1/api"
})

export default axiosConfig