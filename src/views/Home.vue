<template>
  <el-aside class="side-bar el-aside hidden-xs-only">
    <HelloI18n></HelloI18n>
    <Footer></Footer>
  </el-aside>
  <el-main class="body">
    <latest-pages></latest-pages>
  </el-main>
</template>

<script lang="ts">
import LatestPages from "@/views/LatestPages.vue";

export default {
  name: "Home",
  components: { LatestPages },
};
</script>

<style scoped></style>
