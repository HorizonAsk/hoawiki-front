import LoginPage from "@/views/SpecialPages/LoginPage.vue";
import RegisterPage from "@/views/SpecialPages/RegisterPage.vue";
import NotFound from "@/views/NotFound.vue";

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
