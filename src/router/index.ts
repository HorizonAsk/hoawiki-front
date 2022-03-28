import { createRouter, createWebHistory } from "vue-router";

import SpecialPagesRoutes from "@/router/specialPagesRoutes";
import ConceptPagesRoutes from "@/router/ConceptPagesRoutes";
import PageLinkRoutes from "@/router/PageLinkRoutes";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "Home Page",
    },
  },
];

SpecialPagesRoutes.forEach((route) => routes.push(route));
ConceptPagesRoutes.forEach((route) => routes.push(route));
PageLinkRoutes.forEach((route) => routes.push(route));

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
