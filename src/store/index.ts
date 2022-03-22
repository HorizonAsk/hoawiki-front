import { createStore, Store } from "vuex";
import { userStore } from "@/store/modules/user.ts";

declare module "@vue/runtime-core" {
  // 声明自己的 store state
  interface State {
    count: number;
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: userStore,
  },
});
