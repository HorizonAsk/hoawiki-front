<template>
  <el-container class="common-layout">
    <el-container id="nav-container">
      <el-affix>
        <AppBar id="nav"></AppBar>
      </el-affix>
    </el-container>
    <el-scrollbar>
      <el-container id="body-container">
        <el-container id="body">
          <router-view></router-view>
        </el-container>
      </el-container>
    </el-scrollbar>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import AppBar from "@/components/AppBar/AppBar.vue";
import "element-plus/theme-chalk/display.css";

const messageConfig = reactive({
  max: 3,
});

export default defineComponent({
  name: "App",

  components: {
    AppBar,
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
  align-items: center;
  flex-direction: column;
}

.common-layout #nav-container {
  width: 100%;
}

.common-layout #nav-container .el-affix {
  width: 100%;
}

.common-layout .el-container #nav {
  position: relative;
  color: var(--el-text-color-primary);
}

.common-layout .el-container .el-affix #nav,
.common-layout .el-container .el-affix--fixed #nav {
  box-shadow: 0 2px 4px #0000001e, 0 0 6px #0000000a;
  margin-bottom: 5px;
}

.common-layout :deep(#body .side-bar) {
  min-width: 240px;
  max-width: 300px;
  color: var(--el-text-color-primary);
  background: #ffffff;
  border-radius: 4px;
  border-right: solid 5px #ffffff;
  border-left: solid 5px #ffffff;
  box-sizing: border-box;
  box-shadow: 0 2px 4px #929292, 0 0 6px #eeeeee;
}

.common-layout :deep(#body .side-bar .el-affix--fixed) {
  min-width: 240px;
  max-width: 300px;
  color: var(--el-text-color-primary);
  background: #ffffff;
  border-right: solid 5px #ffffff;
  border-left: solid 5px #ffffff;
  box-sizing: border-box;
  box-shadow: 0 2px 4px #eeeeeeff, 0 0 6px #eeeeeeff;
}

.common-layout :deep(#body-container #body .body) {
  padding: 2px;
  background-color: #ffffff;
  color: var(--el-text-color-primary);

  border-right: solid 5px #ffffff;
  border-left: solid 5px #eeeeeeff;
}

.common-layout .el-scrollbar .el-container {
  max-width: 1020px;
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
