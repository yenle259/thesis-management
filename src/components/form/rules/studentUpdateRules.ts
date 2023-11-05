import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

export const studentUpdateRules = () => {
  const rules = ref({
    userId: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào mã số sinh viên";
        if (value?.length == 8) return true;
        return "Mã số sinh viên phải có 8 kí tự";
      },
    ],
    name: [
      (value: any) => {
        if (value?.length == 0) return "Hãy nhập vào họ tên sinh viên";
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
    // moduleType: [
    //   (value: TopicTypeEnum[] | null) => {
    //     if (value === null) return "Hãy chọn phân loại đề tài";
    //     return true;
    //   },
    // ],
  });
  return rules;
};