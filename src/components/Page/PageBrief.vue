<template>
  <el-space id="pageItem" alignment="left" direction="vertical">
    <el-link :href="`/pages/${conceptPage.pageId}`" :underline="false">
      <h2>{{ conceptPage.pageTitle.toString() }}</h2>
    </el-link>
    <p v-if="conceptPage.content != null">
      {{ conceptPage.content.toString() }}
    </p>
    <p
      v-else
      style="font-style: italic; color: var(--el-text-color-disabled-base)"
    >
      （无内容）
    </p>
    <el-space>
      <p>
        <time class="page_time"
          >{{ this.formatDate(conceptPage.updateTime.toString()) }}
        </time>
      </p>
      <el-link
        :href="`/pages/${conceptPage.pageId}/edit`"
        :underline="false"
        type="primary"
        >编辑
      </el-link>
    </el-space>
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
}

h2 {
  text-indent: 0;
}
</style>
