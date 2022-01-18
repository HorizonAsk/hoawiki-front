import {
  AuthService,
  UserLoginPostData,
  UserRegisterInfo,
} from "@/services/auth.service";
import { AxiosResponse } from "axios";
import Message from "@/components/Message/index";

import i18n from "@/i18n.ts";

const { t } = i18n.global;

export interface State {
  accessToken: string;
  userinfo: {
    username: string;
    userEmail: string;
  };
}

export const userStore = {
  namespaced: true,
  state: (): State => ({
    accessToken: localStorage.getItem("accessToken") || "",
    userinfo: {
      username: "",
      userEmail: "",
    },
  }),
  mutations: {
    setUserLogin(state: State, userLoginPostData: UserLoginPostData): void {
      AuthService.userLogin(userLoginPostData)
        .then((res: AxiosResponse) => {
          console.log(res.data.data);
          state.accessToken = res.data.data;
          localStorage.setItem("accessToken", res.data.data);
        })
        .catch(() => {
          Message.error(t("auth.login.login_failed"));
        });
    },
    setUserLogout(state: State): void {
      AuthService.logout();
      state.accessToken = "";
      state.userinfo.username = "";
      state.userinfo.userEmail = "";
      localStorage.removeItem("accessToken");
    },
    setUserRegister(state: State, userRegisterInfo: UserRegisterInfo): void {
      AuthService.register(userRegisterInfo)
        .then((res: AxiosResponse) => {
          console.log(res.data);
        })
        .catch(() => {
          Message.error(t("auth.register.register_failed"));
        });
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state: State): boolean {
      return !!state.accessToken;
    },
  },
};
