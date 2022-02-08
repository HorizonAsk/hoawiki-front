<template>
  <el-space
    alignment="start"
    direction="vertical"
    fill
    style="width: 100%; min-height: 100%"
  >
    <el-space>
      <el-page-header :content="this.title" @back="goBack"></el-page-header>
    </el-space>
    <v-md-editor
      ref="editor"
      v-model="content"
      style="width: auto"
      @save="save"
    >
    </v-md-editor>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PageService } from "@/services/page.service";

export default defineComponent({
  name: "PageEditor",
  params: {
    id: "",
  },
  data: () => ({
    title: "",
    text: "",
    content: "",
  }),
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id) {
      throw new Error("must given id of page");
    }
    PageService.getPage(this.id).then((res) => {
      this.title = res.data.pageItems.pageTitle;
      document.title =
        this.title === undefined
          ? "HoaWiki"
          : "编辑：" + this.title + " | HoaWiki";
    });
    PageService.getPageContent(this.id).then((res) => {
      this.content = res.data.contentText;
    });
  },
  methods: {
    save(text: string): void {
      PageService.postPageContent(this.id, {
        contentText: text,
      });
    },
  },
});
</script>

<style scoped></style>
