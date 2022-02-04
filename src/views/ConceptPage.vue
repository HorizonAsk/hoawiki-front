<template>
  <el-space alignment="start" direction="vertical" fill style="width: 100%">
    <el-space style="align-items: flex-end; justify-content: space-between">
      <el-page-header :content="this.title" @back="goBack"></el-page-header>
      <span style="color: #909399">
        更新时间：{{ this.updateTime }}
      </span></el-space
    >

    <el-space v-model="content" fill>
      <PageToc :content="content"></PageToc>
    </el-space>
  </el-space>
  <v-md-editor
    ref="editor"
    v-model="content"
    style="width: auto"
    @save="save"
  ></v-md-editor>
</template>

<script lang="ts">
import { PageService } from "@/services/page.service";
import PageToc from "@/components/Page/PageToc.vue";

export default {
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save(text, html) {
      PageService.postPageContent(this.id, {
        contentText: text,
      });
    },
  },
};
</script>
<style scoped></style>
