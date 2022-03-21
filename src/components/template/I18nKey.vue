<template>
  <p>{{ t(this.key) }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "I18nKey",
  props: {
    inkey: String,
  },
  setup: () => {
    const { t } = useI18n({
      useScope: "global",
    });
    return { t };
  },
  data() {
    return {
      key: this.inkey,
    };
  },
});
</script>

<style scoped></style>
