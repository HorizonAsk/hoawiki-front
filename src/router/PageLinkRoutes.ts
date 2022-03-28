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
    path: "/pagelinks/:id",
    component: (): Promise<Component> => {
      return import("@/views/PageLink.vue");
    },
    meta: {
      title: "pagelink",
    },
  },
];
