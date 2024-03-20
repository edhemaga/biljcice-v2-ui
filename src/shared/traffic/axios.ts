import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    params: {}
    //baseURL: process.env.HOST
})


axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        const token = localStorage.getItem("token");
        if (!token || !config.headers) return config;
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });


axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 401) {
            console.log(response.statusText)
        };
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;