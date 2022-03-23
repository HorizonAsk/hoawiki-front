<template>
  <n-layout
    ref="containerRef"
    class="common-layout"
    has-sider
    style="width: 100%"
  >
    <n-layout-sider bordered content-style="padding: 10px; ">
      <n-affix
        :listen-to="containerRef"
        :top="80"
        :trigger-top="80"
        style="width: 100%"
      >
        <PageToc id="side-bar-toc" ref="toc" @jump="jumpToHeading"></PageToc>
      </n-affix>
    </n-layout-sider>
    <n-layout-content
      bordered
      content-style="padding: 10px; height:100%;min-height:400px"
    >
      <n-space
        style="
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        "
      >
        <n-page-header style="width: 100%" @back="goBack">
          <template #title>
            <h1>
              {{ this.title }}
            </h1>
          </template>
          <template #extra>
            <a
              :href="`/pages/${this.id}/edit`"
              style="text-decoration: none; color: blue"
              >编辑
            </a>
            <span style="color: #909399">
              更新时间：{{ this.formatDate(this.updateTime) }}
            </span>
          </template>
        </n-page-header>
      </n-space>
      <v-md-preview ref="preview" :text="content" style="width: 100%" />
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
  setup() {
    const containerRef = ref<HTMLElement>(null as unknown as HTMLElement);
    return {
      containerRef,
    };
  },
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
          top: 80,
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
<style scoped></style>
