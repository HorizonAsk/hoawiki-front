import { ElMessage } from "element-plus";

export default {
  // success
  success(message: string): void {
    ElMessage({
      message,
      type: "success"
    });
  },
  // error
  error(message: string): void {
    ElMessage({
      message,
      type: "error"
    });
  },
  // info
  info(message: string): void {
    ElMessage({
      message,
      type: "info"
    });
  },
  // warning
  warning(message: string): void {
    ElMessage({
      message,
      type: "warning"
    });
  }
};
