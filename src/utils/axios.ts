import axios from "axios";
import Message from "@/components/Message";
// import router from "@/router/index";
import { localGet } from "./index";
import config from "../../config";

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
apiClient.defaults.headers.common["token"] = localGet("token") || "";
// 默认 post 请求，使用 application/json 形式
apiClient.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器，内部根据返回值，重新组装，统一管理。
apiClient.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    Message.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Message.info(res.data.message);
    if (res.data.resultCode == 419) {
      Message.warning("需要登陆！");
      // router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }
  return res.data;
});

export default apiClient;
