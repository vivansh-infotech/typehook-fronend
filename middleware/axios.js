import axios from "axios";

const AXIOS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const AXIOS_SET_AUTH_TOKEN = (token) => {
  AXIOS.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const AXIOS_REMOVE_AUTH_TOKEN = () => {
  delete AXIOS.defaults.headers.common["Authorization"];
};
export const AXIOS_SET_LANGUAGE = (language) => {
  AXIOS.defaults.headers.common["Accept-Language"] = language;
};
AXIOS.defaults.headers.common["Accept"] = "application/json";
AXIOS.defaults.headers.common["Content-Type"] = "application/json";

// Add a response interceptor
AXIOS.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

export default AXIOS;
