<template>
  <el-aside class="side-bar el-aside">
    <HelloI18n></HelloI18n>
    <Footer></Footer>
  </el-aside>
  <el-main class="body">
    <latest-pages></latest-pages>
  </el-main>
</template>

<script lang="ts">
import LatestPages from "@/components/Page/LatestPages.vue";

export default {
  name: "Home",
  components: { LatestPages },
};
</script>

<style scoped></style>
