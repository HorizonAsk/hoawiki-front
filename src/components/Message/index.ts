import store from "@/store";

export default {
  // success
  success(message: string, time = 3000, light = false): void {
    store.commit("message", {
      type: "success",
      message: message,
      time: time,
      light: light,
    });
  },
  // error
  error(message: string, time = 3000, light = false): void {
    store.commit("message", {
      type: "error",
      message: message,
      time: time,
      light: light,
    });
  },
  // info
  info(message: string, time = 3000, light = false): void {
    store.commit("message", {
      type: "info",
      message: message,
      time: time,
      light: light,
    });
  },
  // warning
  warning(message: string, time = 3000, light = false): void {
    store.commit("message", {
      type: "warning",
      message: message,
      time: time,
      light: light,
    });
  },
};
