import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000
})

const nonAuthUrl = ["/user/login", "/user/register"]

axiosClient.interceptors.request.use(
    (config) => {
        if (!nonAuthUrl.includes(config.url)) {
            const token = localStorage.getItem("token");
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => error.response.data
);

export default axiosClient;