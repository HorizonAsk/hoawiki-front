<template>
  <n-space vertical>
    <p>{{ t("SIDE_BAR_MESSAGE") }}</p>

    <p>{{ t("SIDE_BAR_NOT_LOADED_MESSAGE") }}</p>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HelloI18n",
  setup() {
    const { locale, t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });

    // Something todo ..

    return { locale, t };
  },
});
</script>
