<template>
  <n-dropdown
    :options="this.messagesOption"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    placement="bottom-start"
    trigger="click"
    @select="changeLang"
  >
    <n-button style="align-content: center">
      {{ t("appbar.change_language") }}
    </n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { useI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { DropdownOption, NIcon } from "naive-ui";
import I18nKey from "@/components/template/I18nKey.vue";
import { Select } from "@vicons/tabler";

export default defineComponent({
  name: "LocaleChanger",
  setup: () => {
    const { locale, t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });
    const messagesOption = [];
    for (const item in messages) {
      messagesOption.push({
        label: item,
        key: item,
      });
    }
    return { locale, t, messagesOption };
  },
  data() {
    return {
      messages: messages,
    };
  },
  created() {
    if (localStorage.getItem("locale") !== null) {
      this.changeLang(localStorage.getItem("locale"));
    } else {
      localStorage.setItem("locale", import.meta.env.VITE_APP_I18N_LOCALE);
    }
  },
  methods: {
    changeLang(key: string): void {
      this.locale = key;
      localStorage.setItem("locale", key);
    },
    renderDropdownLabel(option: DropdownOption) {
      return h(I18nKey, { inkey: "language." + option.label });
    },
    renderDropdownIcon(option: DropdownOption) {
      if (option.label === this.locale) {
        return h(NIcon, null, h(Select));
      } else {
        return h(NIcon, null);
      }
    },
  },
});
</script>

<style></style>
