import axios from "axios";
import { notification } from "antd";

export const URLFiles = process.env.NEXT_PUBLIC_API + "/files/";

const api = () => {
  const defaultOptions = {
    baseURL: "http://localhost:3000/api",
    headers: {
      "Access-Control-Allow-Origin": "**",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    if (config.url !== "/login") {
      const sessionParsed = JSON.parse(localStorage.getItem("_AUTH") ?? "{}")
        .state.user;
      if (sessionParsed) {
        if (sessionParsed && sessionParsed?.token) {
          config.headers.Authorization = `Bearer ${sessionParsed.token}`;
        }
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      const status = error?.response?.status;
      if (window && status === 401 && error?.config?.url !== "/login") {
        localStorage.removeItem("_AUTH");
        notification.error({
          message: "Por favor, faça o login para continuar",
          duration: 5000,
        });
        window.location.href = `/?redirect=${encodeURIComponent(
          window.location.pathname
        )}`;
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default api();
