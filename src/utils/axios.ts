import axios from "axios";
import Message from "@/components/Message";
// import router from "@/router/index";
import config from "../../config";
import store from "@/store";
import { ApiResponse } from "@/utils/apiResponse";

const apiClient = axios.create({
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
apiClient.defaults.baseURL = config[import.meta.env.MODE].baseUrl;
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
apiClient.defaults.withCredentials = true;
// 请求头，headers 信息
apiClient.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
apiClient.defaults.headers.common["Authorization"] =
  store.state.user.accessToken;
// 默认 post 请求，使用 application/json 形式
apiClient.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器，内部根据返回值，重新组装，统一管理。
apiClient.interceptors.response.use(
  (res) => {
    console.debug("axios got res as", res);
    return res;
  },
  (error) => {
    if (error.response.data.apiCode == ApiResponse.API_RESPONSE_UNAUTHORIZED) {
      Message.error("需要登陆！");
      // router.push({ path: "/login" });
    } else {
      if (error.response.data.apiCode in ApiResponse) {
        return Promise.reject(error);
      }
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
