import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import i18n from "@/i18n";

loadFonts();

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(vuetify);
app.mount("#app");
