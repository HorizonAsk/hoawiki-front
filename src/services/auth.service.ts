import axios from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface UserLoginPostData {
  password: string;
  userEmail: string;
}

export interface UserRegisterInfo {
  password: string;
  userEmail: string;
  userName: string;
}

export class AuthService {
  static userLogin(user: UserLoginPostData): Promise<AxiosResponse> {
    return axios
      .post("auth/user/login", {
        userEmail: user.userEmail,
        password: user.password,
      })
      .then((response) => {
        return response;
      });
  }

  static logout() {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // localStorage.removeItem("roles");
    // localStorage.removeItem("permissions");
  }

  static register(userRegisterInfo: UserRegisterInfo) {
    return axios
      .post("auth/user/register", {
        userEmail: userRegisterInfo.userEmail,
        userName: userRegisterInfo.userName,
        password: userRegisterInfo.password,
      })
      .then((response) => {
        return response;
      });
  }
}
