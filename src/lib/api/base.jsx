import axios from "axios";

const BASE_URL = "/api/";
const instance = axios.create({
  baseURL: BASE_URL,
});

// 미들웨어
instance.interceptors.request.use(
  function (config) {
    // request처리 로직 (header 등)
    return config;
  },
  function (error) {
    // 요청 오류시 처리 로직
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 500) {
      // 에러처리
      console.log("500 에러 발생");
    }

    return Promise.reject(error);
  }
);

export default instance;
