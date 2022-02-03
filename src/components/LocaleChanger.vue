<template>
  <el-sub-menu class="el-sub-menu" offset-y>
    <template #title>
      {{ t("appbar.change_language") }}
    </template>
    <el-menu-item
      v-for="(item, index) in messages"
      :key="index"
      class="align-center"
      min-height="30px"
      min-width="100px"
      @click="
        this.changeLang(index);
        $router.go(0);
      "
    >
      <div v-if="index === locale">
        <el-icon><Select /></el-icon>
        {{ t("language." + index) }}
      </div>
      <div v-else>
        <el-icon></el-icon>
        {{ t("language." + index) }}
      </div>
    </el-menu-item>
  </el-sub-menu>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { Select } from "@element-plus/icons-vue";

export default {
  name: "LocaleChanger",
  components: {
    Select,
  },
  setup: () => {
    const { locale, t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });
    return { locale, t };
  },
  data: () => ({
    messages: messages,
  }),
  created() {
    if (localStorage.getItem("locale")) {
      this.changeLang(localStorage.getItem("locale"));
    }
  },
  methods: {
    changeLang(index: string): void {
      this.locale = index;
      localStorage.setItem("locale", index);
    },
  },
};
</script>
