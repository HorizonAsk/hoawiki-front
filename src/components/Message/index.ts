import store from "@/store";
import { MessageData } from "@/components/Message/index.d.ts";

export default {
  // success
  success(data: MessageData): void {
    store.commit("message", {
      type: "success",
      message: data.message ? data.message : data,
      time: data.time ? data.time : 3000,
      light: data.light ? data.light : false,
    });
  },
  // error
  error(data: MessageData): void {
    store.commit("message", {
      type: "error",
      message: data.message ? data.message : data,
      time: data.time ? data.time : 3000,
      light: data.light ? data.light : false,
    });
  },
  // info
  info(data: MessageData): void {
    store.commit("message", {
      type: "info",
      message: data.message ? data.message : data,
      time: data.time ? data.time : 3000,
      light: data.light ? data.light : false,
    });
  },
  // warning
  warning(data: MessageData): void {
    store.commit("message", {
      type: "warning",
      message: data.message ? data.message : data,
      time: data.time ? data.time : 3000,
      light: data.light ? data.light : false,
    });
  },
};
