<template>
  <el-container
    class="common-layout"
    fill
    style="align-items: center; flex-direction: column"
  >
    <el-affix>
      <AppBar id="nav"></AppBar>
    </el-affix>
    <el-container>
      <el-container id="side-bar">
        <el-aside class="el-aside">
          <HelloI18n></HelloI18n>
          <Footer></Footer>
        </el-aside>
      </el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloI18n from "@/components/HelloI18n.vue";
import AppBar from "@/components/AppBar/AppBar.vue";
import Footer from "@/components/Common/Footer.vue";

const messageConfig = reactive({
  max: 3,
});

export default defineComponent({
  name: "App",

  components: {
    AppBar,
    HelloI18n,
    Footer,
  },

  data() {
    return {
      messageConfig,
    };
  },
});
</script>

<style scoped>
.common-layout {
}

.common-layout el-affix {
  position: relative;
  color: var(--el-text-color-primary);
  padding: 5px;
}

.common-layout #nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 5px;
  min-width: 1050px;
}

.common-layout #side-bar {
  min-width: 240px;
  max-width: 280px;
  color: var(--el-text-color-primary);
  background: #e6e6e6;
  border-right: solid 5px #ffffff;
  border-left: solid 5px #eeeeeeff;
  box-sizing: border-box;
  box-shadow: 0 2px 4px #eeeeeeff, 0 0 6px #eeeeeeff;
}

.common-layout .el-main {
  padding: 2px;
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

.common-layout > .el-container {
  min-width: 950px;
}

.common-layout .el-menu {
  border-right: none;
}

.common-layout .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
