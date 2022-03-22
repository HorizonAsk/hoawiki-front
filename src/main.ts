import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import "vfonts/Lato.css";
import i18n from "@/i18n";
import router from "@/router/index";
import { vueMarkdownEditor, vueMarkdownPreviewer } from "@/md-editor.js";

// loadFonts();

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(router);
app.use(vueMarkdownEditor);
app.use(vueMarkdownPreviewer);
app.mount("#app");
