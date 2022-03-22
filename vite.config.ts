import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import path from "path";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [NaiveUiResolver()],

      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        NaiveUiResolver(),
      ],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
});
