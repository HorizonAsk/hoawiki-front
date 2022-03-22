export default {
  // success
  success(message: string): void {
    window.$message.success(message);
  },
  // error
  error(message: string): void {
    window.$message.error(message);
  },
  // info
  info(message: string): void {
    window.$message.info(message);
  },
  // warning
  warning(message: string): void {
    window.$message.warning(message);
  },
  //loading
  loading(message: string): void {
    window.$message.loading(message);
  },
};
