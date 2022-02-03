export default [
  {
    path: "/pages/",
    component: () => import("@/views/SpecialPages/LoginPage.vue"),
    meta: {
      title: "LoginPage",
    },
  },
];
