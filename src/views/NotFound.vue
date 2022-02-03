<template>
  <h1>404 Not Found!</h1>
  <h1>您访问的页面不存在！</h1>
  <h3>页面将于{{ jumpTime }}秒后跳转至首页。</h3>
  <meta content="5; URL=/" http-equiv="refresh" />
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      jumpTime: 5,
    };
  },
  methods: {
    leftTime() {
      this.jumpTime--;
    },
  },
  created() {
    setInterval(this.leftTime, 1000);
  },
};
</script>
