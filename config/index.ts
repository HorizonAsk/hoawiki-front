export default {
  development: {
    baseUrl: process.env.ApiUrl, // 开发接口域名
  },
  beta: {
    baseUrl: process.env.ApiUrl, // 测试接口域名
  },
  production: {
    baseUrl: process.env.ApiUrl, // 正式接口域名
  },
};
