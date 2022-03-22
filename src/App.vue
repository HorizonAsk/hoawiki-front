<template>
  <n-message-provider class="absolute-anchor-container">
    <n-layout ref="containerRef" class="common-layout">
      <n-layout-header bordered content-style="padding: 10px; "
        >>
        <n-affix :listen-to="containerRef" :top="0" :trigger-top="60">
          <AppBar id="nav"></AppBar>
        </n-affix>
        <div style="height: 50px"></div>
      </n-layout-header>
      <router-view></router-view>
    </n-layout>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppBar from "@/components/AppBar/AppBar.vue";

export default defineComponent({
  name: "App",
  components: {
    AppBar,
  },
  setup() {
    const containerRef = ref<HTMLElement>(null as unknown as HTMLElement);
    return {
      containerRef,
    };
  },
});
</script>

<style>
.n-affix {
  width: 100vw;
  z-index: 999;
}

.n-dropdown .n-dropdown-option .n-dropdown-option-body {
  align-items: center;
}

.absolute-anchor-container {
  width: 100%;
  position: relative;
}

.common-layout {
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}
</style>
