import store from "@/store";

export default {
  // success
  success(message: string, time = 3000, elevation = 4): void {
    store.commit("message/setMessage", {
      type: "success",
      message: message,
      time: time,
      elevation: elevation,
    });
  },
  // error
  error(message: string, time = 3000, elevation = 4): void {
    store.commit("message/setMessage", {
      type: "error",
      message: message,
      time: time,
      elevation: elevation,
    });
  },
  // info
  info(message: string, time = 3000, elevation = 4): void {
    store.commit("message/setMessage", {
      type: "info",
      message: message,
      time: time,
      elevation: elevation,
    });
  },
  // warning
  warning(message: string, time = 3000, elevation = 4): void {
    store.commit("message/setMessage", {
      type: "warning",
      message: message,
      time: time,
      elevation: elevation,
    });
  },
};
