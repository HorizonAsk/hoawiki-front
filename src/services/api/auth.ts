import {
  AuthService,
  UserLoginPostData,
  UserRegisterInfo,
} from "@/services/auth.service";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/utils/apiResponse";
import Message from "@/components/Message";
import router from "@/router";

import i18n from "@/i18n.ts";
import store from "@/store";

const { t } = i18n.global;

export function setUserLogin(userLoginPostData: UserLoginPostData): void {
  AuthService.userLogin(userLoginPostData)
    .then((res: AxiosResponse) => {
      console.log(res.data.jwt);
      store.commit("user/setJWT", res.data.jwt);
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
}

export function setUserLogout(): void {
  AuthService.logout();
  store.commit("user/setUserLogout");
}

export function setUserRegister(userRegisterInfo: UserRegisterInfo): void {
  AuthService.register(userRegisterInfo)
    .then(() => {
      Message.info(t("auth.register.register_succeed"));
      router.push("/login");
    })
    .catch((error) => {
      if (
        error.response.data.apiCode == ApiResponse.API_RESPONSE_USER_EXISTED
      ) {
        Message.error(t("auth.register.user_exists"));
      } else {
        if (error.response.data.apiCode == ApiResponse.API_RESPONSE_PARAM_BAD) {
          Message.error(t("auth.register.register_failed"));
        }
      }
    });
}
