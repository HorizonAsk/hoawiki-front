<template>
  <n-layout-content bordered content-style="padding: 10px; ">
    <n-space
      style="align-items: flex-end; justify-content: space-between; width: 100%"
    >
      <n-page-header @back="showModalExit = true">
        <template #title>
          <h1>编辑： {{ this.title }}</h1>
        </template>
      </n-page-header>
    </n-space>
    <v-md-editor
      ref="editor"
      v-model="content"
      style="width: auto"
      @save="showModalSave = true"
    >
    </v-md-editor>
    <n-modal
      v-model:show="showModalExit"
      :mask-closable="false"
      content="草稿不会保存"
      negative-text="算了"
      positive-text="确认"
      preset="dialog"
      title="确定退出编辑吗"
      @positive-click="onPositiveClick_Exit"
      @negative-click="onNegativeClick_Exit"
    />
    <n-modal
      v-model:show="showModalSave"
      :mask-closable="false"
      content="保存后将覆盖现有的页面"
      negative-text="稍等"
      positive-text="确认"
      preset="dialog"
      title="确定保存吗"
      @positive-click="onPositiveClick_Save"
      @negative-click="onNegativeClick_Save"
    />
  </n-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PageService } from "@/services/page.service";
import message from "@/components/Message/index";

export default defineComponent({
  name: "PageEditor",
  params: {
    id: "",
  },
  data: () => ({
    title: "",
    text: "",
    content: "",
    showModalExit: false,
    showModalSave: false,
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
      }); // TODO: exceptions.
      message.info("已保存");
      // TODO: wait.
      this.$router.push("/pages/" + this.id);
    },
    goBack() {
      this.$router.go(-1);
    },
    onNegativeClick_Exit() {
      this.showModalExit = false;
    },
    onPositiveClick_Exit() {
      message.warning("放弃了草稿");
      this.showModalExit = false;
      this.goBack();
    },
    onNegativeClick_Save() {
      this.showModalExit = false;
    },
    onPositiveClick_Save() {
      message.success("正在提交");
      this.showModalExit = false;
      this.save();
    },
  },
});
</script>

<style scoped></style>
