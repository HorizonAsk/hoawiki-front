<template>
  <h1>404 Not Found!</h1>
  <h1>{{ t("exception.page_not_found_message") }}</h1>
  <h3>{{ t("exception.page_jump_after_time", { jumpTime: jumpTime }) }}</h3>
  <meta content="5; URL=/" http-equiv="refresh" />
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
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
      jumpTime: 5,
    };
  },
  methods: {
    leftTime() {
      this.jumpTime--;
    },
  },
  created() {
    setInterval(this.leftTime, 1000);
  },
};
</script>
