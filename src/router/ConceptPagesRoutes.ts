export default [
  {
    path: "/pages/",
    component: () => import("@/views/PageList.vue"),
    meta: {
      title: "pageList",
    },
  },
  {
    path: "/pages/:id",
    component: () => import("@/views/ConceptPage.vue"),
    meta: {
      title: "page",
    },
  },
];
