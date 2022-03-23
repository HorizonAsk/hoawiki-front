<template>
  <n-layout-content
    content-style="padding: 24px;width: 100%"
    style="min-height: 400px; background-color: dimgray"
  >
    <n-space style="justify-content: center">
      <n-card style="text-align: center">
        <template #header><h1>404 Not Found!</h1></template>

        <h1>{{ t("exception.page_not_found_message") }}</h1>
        <h3>
          {{ t("exception.page_jump_after_time", { jumpTime: jumpTime }) }}
        </h3>
        <meta content="4; URL=/" http-equiv="refresh" />
      </n-card>
    </n-space>
  </n-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NotFound",
  setup() {
    const { t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });

    return { t };
  },
  data() {
    return {
      jumpTime: 4,
    };
  },
  methods: {
    leftTime(): void {
      this.jumpTime > 0 ? this.jumpTime-- : null;
    },
  },
  created() {
    setInterval(this.leftTime, 1000);
  },
});
</script>
