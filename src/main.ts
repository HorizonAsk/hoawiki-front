import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Message from "@/components/Message/index";

// loadFonts();

createApp(App).use(store).use(vuetify).mount("#app");
