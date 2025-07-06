const { default: axios } = require("axios");
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_API_BASE_URL || 'http://localhost:8080',
    withCredentials:true
})


api.interceptors.request.use((config: { headers: { [x: string]: any; }; }) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (csrfToken) {
        config.headers["XSRF-TOKEN"] = csrfToken;
    }
    return config;
})

api.interceptors.response.use((response: any) => response, (error: any) => {
    if (error.response && error.response.status === 401) {
        window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
})

export default api;