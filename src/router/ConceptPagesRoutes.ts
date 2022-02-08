import { Component } from "vue";

export default [
  // {
  //   path: "/pages/",
  //   component: () => import("@/views/PageList.vue"),
  //   meta: {
  //     title: "pageList",
  //   },
  // },
  {
    path: "/pages/:id",
    component: (): Promise<Component> => {
      return import("@/views/ConceptPage.vue");
    },
    meta: {
      title: "page",
    },
  },
  {
    path: "/pages/:id/edit",
    component: (): Promise<Component> => {
      return import("@/views/PageEditor.vue");
    },
    meta: {
      title: "edit page",
    },
  },
];
