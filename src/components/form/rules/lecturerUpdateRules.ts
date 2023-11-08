export const lecturerUpdateRules = () => {
  const rules = ref({
    userId: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào mã số cán bộ";
        if (value?.length == 8) return true;
        return "Mã số cán bộ phải có 8 kí tự";
      },
    ],
    name: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào họ tên cán bộ";
        return true;
      },
    ],
    email: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào email";
        return true;
      },
    ],
    password: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào mật khẩu";
        if (value?.length >= 8) return true;
        return "Mật khẩu phải hơn 8 kí tự";
      },
    ],
  });
  return rules;
};
