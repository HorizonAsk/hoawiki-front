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
    setJWT(state: State, jwt: string): void {
      state.accessToken = jwt;
      localStorage.setItem("accessToken", jwt);
    },
    setLoggedUser(state: State, payload: State): void {
      state.accessToken = payload.accessToken;
      state.userinfo.username = payload.userinfo.username;
      state.userinfo.userEmail = payload.userinfo.userEmail;
    },
    setUserLogout(state: State): void {
      state.accessToken = "";
      state.userinfo.username = "";
      state.userinfo.userEmail = "";
      localStorage.removeItem("accessToken");
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state: State): boolean {
      return !!state.accessToken;
    },
  },
};
