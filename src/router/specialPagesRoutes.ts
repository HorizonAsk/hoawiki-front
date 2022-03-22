import i18n from "@/i18n.ts";
import { Component } from "vue";

const { t } = i18n.global;
export default [
  {
    path: "/login",
    component: (): Promise<Component> => {
      return import("@/views/SpecialPages/LoginPage.vue");
    },
    meta: {
      title: t("auth.login.login_button_name"),
    },
  },
  {
    path: "/register",
    component: (): Promise<Component> => {
      return import("@/views/SpecialPages/RegisterPage.vue");
    },
    meta: {
      title: t("auth.login.register_button_name"),
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: (): Promise<Component> => {
      return import("@/views/NotFound.vue");
    },
    meta: {
      title: t("exception.page_not_found_title"),
    },
  },
];
