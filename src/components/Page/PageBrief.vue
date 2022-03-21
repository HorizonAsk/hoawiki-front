<template>
  <n-thing>
    <template #avatar>
      <n-avatar fallback-src="" size="large" src="" />
    </template>
    <template #header>
      <a :href="`/pages/${conceptPage.pageId}`" underline="false">
        {{ conceptPage.pageTitle }}
      </a>
    </template>
    <template #description>
      <time class="page_time"
        >{{ this.formatDate(conceptPage.updateTime.toString()) }}
      </time>
    </template>
    <p>
      {{ conceptPage.content }}
    </p>
  </n-thing>
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

<style scoped></style>
