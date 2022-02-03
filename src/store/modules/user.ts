import {
  AuthService,
  UserLoginPostData,
  UserRegisterInfo,
} from "@/services/auth.service";
import { AxiosResponse } from "axios";
import Message from "@/components/Message/index";
import { ApiResponse } from "@/utils/apiResponse";
import router from "@/router";

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
          console.log(res.data.jwt);
          state.accessToken = res.data.jwt;
          localStorage.setItem("accessToken", res.data.jwt);
        })
        .catch((error) => {
          if (
            error.response.data.apiCode ==
            ApiResponse.API_RESPONSE_USERNAME_PASSWORD_ERROR
          ) {
            Message.error(t("auth.login.login_failed"));
          } else {
            Message.error(error.response.data.message);
          }
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
          Message.info(t("auth.register.register_succeed"));
          router.push("/login");
        })
        .catch((error) => {
          if (
            error.response.data.apiCode == ApiResponse.API_RESPONSE_USER_EXISTED
          ) {
            Message.error(t("auth.register.user_exists"));
          } else {
            if (
              error.response.data.apiCode == ApiResponse.API_RESPONSE_PARAM_BAD
            ) {
              Message.error(t("auth.register.register_failed"));
            }
          }
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
