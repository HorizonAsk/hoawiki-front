<template>
  <div>
    <el-page-header :content="this.title" @back="goBack"></el-page-header>
    {{ this.content }}
    <p>
      {{ this.updateTime }}
    </p>
  </div>
</template>

<script>
import { PageService } from "../services/page.service";

export default {
  name: "ConceptPage",
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
  },
};
</script>

<style scoped></style>
