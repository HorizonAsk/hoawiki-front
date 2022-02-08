<template>
  <el-aside class="side-bar">
    <el-affix :offset="80" fill target="#body" z-index="50">
      <PageToc id="side-bar-toc" ref="toc" @jump="jumpToHeading"></PageToc>
    </el-affix>
  </el-aside>
  <el-main>
    <el-space alignment="start" direction="vertical" fill style="width: 100%">
      <el-space style="align-items: flex-end; justify-content: space-between">
        <el-space>
          <el-page-header :content="this.title" @back="goBack"></el-page-header>
          <el-link
            :href="`/pages/${this.id}/edit`"
            :underline="false"
            type="primary"
            >编辑
          </el-link>
        </el-space>
        <span style="color: #909399">
          更新时间：{{ this.formatDate(this.updateTime) }}
        </span>
      </el-space>
      <v-md-preview ref="preview" :text="content" style="width: 100%" />
    </el-space>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PageService } from "@/services/page.service";
import PageToc from "@/components/Page/PageToc.vue";
import { FluentDate } from "@/utils/datetimeFormat";

export default defineComponent({
  name: "ConceptPage",
  components: { PageToc },
  data: () => ({
    id: "",
    title: "",
    content: "",
    updateTime: "",
  }),
  mounted() {
    this.id = this.$route.params.id;
    PageService.getPage(this.id).then((res) => {
      this.title = res.data.pageItems.pageTitle;
      document.title =
        this.title === undefined ? "HoaWiki" : this.title + " | HoaWiki";
    });
    PageService.getPageContent(this.id).then((res) => {
      this.content = res.data.contentText;
      this.updateTime = res.data.createTime;
    });
  },
  watch: {
    content: function () {
      this.$nextTick(function () {
        const anchors =
          this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
        this.$refs.toc.generateToc(anchors);
      });
    },
  },
  methods: {
    jumpToHeading(anchor: NodeList) {
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
    formatDate(date: string) {
      return FluentDate.parseAndRelative(date);
    },
    goBack() {
      this.$router.go(-1);
    },
    save(text: string) {
      PageService.postPageContent(this.id, {
        contentText: text,
      });
    },
  },
});
</script>
<style scoped>
.side-bar {
  align-items: flex-start;
}
</style>
