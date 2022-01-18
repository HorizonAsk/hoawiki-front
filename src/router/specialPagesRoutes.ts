import LoginPage from "@/components/MainPages/SpecialPages/LoginPage.vue";
import RegisterPage from "@/components/MainPages/SpecialPages/RegisterPage.vue";
import NotFound from "@/components/MainPages/NotFound.vue";

export default [
  {
    path: "/login",
    component: LoginPage,
    meta: {
      title: "LoginPage",
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Register",
    },
  },
];
