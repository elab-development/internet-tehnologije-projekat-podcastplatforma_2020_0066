import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  /*timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },*/
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    /*
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }*/

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
