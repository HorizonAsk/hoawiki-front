<template>
  <div style="max-width: 240px">
    <div v-for="anchor in titles" v-bind:key="anchor">
      <el-divider v-if="anchor.indent < 1"></el-divider>
      <el-divider v-else border-style="dashed"></el-divider>
      <span
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </span>
    </div>
  </div>
  <v-md-preview ref="preview" :text="content" style="width: 100%" />
</template>

<script>
export default {
  props: ["content"],
  data: () => ({
    titles: [],
  }),
  updated() {
    this.generateToc();
  },
  methods: {
    generateToc() {
      const anchors =
        this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
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
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
  },
};
</script>
<style scoped>
.el-menu-item .a {
  display: block;
}
</style>
