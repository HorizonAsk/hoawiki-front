<template>
  <p>{{ t("SIDE_BAR_MESSAGE") }}</p>
  <p>{{ t("SIDE_BAR_NOT_LOADED_MESSAGE") }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HelloI18n",
  setup() {
    const { t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });

    // Something todo ..

    return { t };
  },
});
</script>
