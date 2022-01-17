import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */

export default createI18n({
  legacy: false,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || "en",
  messages,
});
