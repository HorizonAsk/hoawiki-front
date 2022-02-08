<template>
  <div style="max-width: 240px">
    <div v-for="anchor in titles" v-bind:key="anchor">
      <div v-if="anchor.indent < 1">
        <el-divider style="margin: 2px"></el-divider>
        <el-link
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          :underline="false"
          style="font-weight: bolder"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </el-link>
      </div>
      <div v-else>
        <el-divider border-style="dashed" style="margin: 1px"></el-divider>
        <el-link
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          :underline="false"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    titles: [],
  }),
  emits: {
    jump: null,
  },
  methods: {
    generateToc(anchors: NodeList): void {
      const titles = Array.from(anchors).filter(
        (title) => !!title.innerText.trim()
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map((title) => title.tagName))
      ).sort();

      this.titles = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
    },
    handleAnchorClick(anchor: Node): void {
      this.$emit("jump", anchor);
    },
  },
});
</script>
<style scoped>
.el-menu-item .a {
  display: block;
  font-family: sans-serif;
}
</style>
