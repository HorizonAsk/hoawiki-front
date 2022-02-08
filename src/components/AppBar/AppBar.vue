<template>
  <el-space
    direction="horizontal"
    style="
      width: 100%;
      justify-content: space-between;
      background-color: #ffffff;
    "
  >
    <el-space>
      <el-image
        :src="hoalogo"
        class="el-menu-item nav-bar-item"
        fit="cover"
        @click="$router.push('/')"
      />
      <p style="font-size: var(--el-font-size-extra-large)">HoaWiki</p>
    </el-space>
    <el-menu
      :ellipsis="false"
      class="el-menu nav-bar-item"
      mode="horizontal"
      style="justify-content: flex-end"
    >
      <LocaleChanger class="nav-bar-item"></LocaleChanger>
      <UserPanel class="nav-bar-item"></UserPanel>
    </el-menu>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LocaleChanger from "@/components/LocaleChanger.vue";
import UserPanel from "@/components/AppBar/UserPanel/UserPanel.vue";
import hoalogo from "@/assets/hoalogo.jpg";

export default defineComponent({
  name: "AppBar",
  components: {
    UserPanel,
    LocaleChanger,
  },
  data() {
    return {
      hoalogo,
    };
  },
});
</script>

<style scoped>
.nav-bar-item {
  height: 60px;
}
</style>
