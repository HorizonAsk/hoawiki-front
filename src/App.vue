<template>
  <el-container class="common-layout">
    <el-affix>
      <el-header class="el-header" mode="horizontal">
        <AppBar></AppBar>
      </el-header>
    </el-affix>
    <el-container>
      <el-aside class="el-aside">
        <HelloI18n></HelloI18n>
        <HelloWorld></HelloWorld>
      </el-aside>
      <el-container>
        <el-config-provider :message="messageConfig">
          <el-main>
            <el-scrollbar always>
              <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-config-provider>
      </el-container>
    </el-container>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
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
    HelloWorld,
    HelloI18n,
    Footer,
  },

  data() {
    return {
      messageConfig,
      //
    };
  },
});
</script>

<style scoped>
.common-layout {
}

.common-layout .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  padding: 0;
}

.common-layout .el-footer {
  background-color: var(--el-bg-color);
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
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
