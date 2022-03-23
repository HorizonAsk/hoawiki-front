<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 24px;">
      <HelloI18n></HelloI18n>
      <Footer></Footer>
    </n-layout-sider>
    <n-layout-content bordered content-style="padding: 24px; height:100%">
      <latest-pages></latest-pages>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import LatestPages from "@/components/Page/LatestPages.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { LatestPages },
});
</script>

<style scoped></style>
