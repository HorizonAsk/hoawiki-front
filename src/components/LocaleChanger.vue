<template>
  <v-menu class="mx-auto" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        v-model="locale"
        color="primary"
        dark
        min-width="100px"
        v-bind="props"
      >
        {{ t("appbar.change_language") }}
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list class="mx-auto" tile>
        <v-list-item
          v-for="(item, index) in messages"
          :key="index"
          class="align-center"
          min-height="30px"
          min-width="100px"
          @click="this.changeLang(index)"
        >
          <div v-if="index === locale">
            <v-row>
              <v-icon>mdi-check</v-icon>
              <v-list-item-title
                >{{ t("language." + index) }}
              </v-list-item-title>
            </v-row>
          </div>
          <div v-else>
            <v-row>
              <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
              <v-list-item-title
                >{{ t("language." + index) }}
              </v-list-item-title>
            </v-row>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

export default {
  name: "LocaleChanger",
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
