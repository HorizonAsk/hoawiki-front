import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import vuetify from "./plugins/vuetify";
import i18n from "@/i18n";
import router from "@/router/index";

// loadFonts();

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(vuetify);
app.use(router);
app.mount("#app");
