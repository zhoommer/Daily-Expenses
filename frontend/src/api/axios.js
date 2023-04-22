import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    baseURL: process.env.REACT_APP_BASE_URL,
})

export default axiosInstance;