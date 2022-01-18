import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/MainPages/Home.vue";

import SpecialPagesRoutes from "./specialPagesRoutes";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home Page",
    },
  },
];

SpecialPagesRoutes.forEach((route) => routes.push(route));

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  window.document.title =
    to.meta.title == undefined ? "HoaWiki" : to.meta.title + " | HoaWiki";
  next();
});

export default router;
