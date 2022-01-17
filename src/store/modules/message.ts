import { MessageData } from "@/components/Message/index.d.ts";

export interface State {
  msgPool: MessageData[];
}

export const messageStore = {
  namespaced: true,
  state: () => ({
    msgPool: [],
  }),
  mutations: {
    setMessage(state: State, step: MessageData) {
      state.msgPool.push(step);
      setTimeout(() => {
        state.msgPool.shift();
      }, step.time);
    },
  },
  actions: {},
  getters: {},
};
