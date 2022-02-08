<template>
  <el-space id="pageItem" alignment="left" direction="vertical">
    <div>
      <el-link
        :href="`/pages/${conceptPage.pageId}`"
        :underline="false"
        style="justify-content: flex-start"
      >
        <h3 id="pageTitle">{{ conceptPage.pageTitle.toString() }}</h3>
      </el-link>
    </div>
    <p v-if="conceptPage.content != null">
      {{ conceptPage.content.toString() }}
    </p>
    <div
      v-else
      style="font-style: italic; color: var(--el-text-color-disabled-base)"
    >
      （暂无内容）
    </div>
    <el-row :gutter="2" style="align-items: center">
      <el-col span="6">
        <div>
          <time class="page_time"
            >{{ this.formatDate(conceptPage.updateTime.toString()) }}
          </time>
        </div>
      </el-col>
      <el-col span="6">
        <el-link
          :href="`/pages/${conceptPage.pageId}/edit`"
          :underline="false"
          type="primary"
          >编辑
        </el-link>
      </el-col>
    </el-row>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FluentDate } from "@/utils/datetimeFormat";

export default defineComponent({
  name: "PageBrief",
  props: {
    conceptPage: null,
  },
  methods: {
    formatDate(date: string): string {
      return FluentDate.parseAndRelative(date);
    },
  },
});
</script>

<style scoped>
#pageItem {
  text-align: left;
  padding-left: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#pageTitle {
  border-bottom: 1px solid #ccc;
}
</style>
