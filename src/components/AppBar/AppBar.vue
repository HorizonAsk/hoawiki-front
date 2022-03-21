<template>
  <n-space
    direction="horizontal"
    style="
      width: 100%;
      justify-content: space-around;
      background-color: #ffffff;
    "
  >
    <n-space>
      <n-image
        class="nav-bar-item"
        :src="hoalogo"
        preview-disabled
        @click="$router.push('/')"
        style="padding: 1px"
      />
      <a href="/" style="text-decoration: none"><h3>HoaWiki</h3></a>
    </n-space>
    <n-space style="justify-content: flex-end">
      <LocaleChanger class="nav-bar-item"></LocaleChanger>
      <UserPanel class="nav-bar-item"></UserPanel>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LocaleChanger from "@/components/LocaleChanger.vue";
import UserPanel from "@/components/AppBar/UserPanel/UserPanel.vue";
import hoalogo from "@/assets/hoalogo.jpg";
import { useMessage } from "naive-ui";

export default defineComponent({
  name: "AppBar",
  components: {
    UserPanel,
    LocaleChanger,
  },
  setup() {
    window.$message = useMessage();
  },
  data() {
    return {
      hoalogo,
    };
  },
});
</script>

<style>
.n-space > * {
  align-self: center;
}
</style>
<style scoped>
.nav-bar-item {
  height: 60px;
}
</style>
