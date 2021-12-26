import { createStore } from "vuex";
import { MessageData } from "@/components/Message/index.d.ts";

const msgPoolArr: MessageData[] = [];
export default createStore({
  state: {
    msgPool: msgPoolArr,
  },
  mutations: {
    message(state, step: MessageData) {
      state.msgPool.push(step);
      setTimeout(() => {
        state.msgPool.shift();
      }, step.time);
    },
  },
  actions: {},
  modules: {},
});
