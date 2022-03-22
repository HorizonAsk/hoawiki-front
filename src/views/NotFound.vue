<template>
  <el-space direction="vertical" style="width: 100%; min-height: 100%">
    <el-card style="text-align: center">
      <h1>404 Not Found!</h1>
      <h1>{{ t("exception.page_not_found_message") }}</h1>
      <h3>{{ t("exception.page_jump_after_time", { jumpTime: jumpTime }) }}</h3>
      <meta content="2; URL=/" http-equiv="refresh" />
    </el-card>
  </el-space>
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
      jumpTime: 2,
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
