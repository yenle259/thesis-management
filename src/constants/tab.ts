import { OptionTab } from "@/apis/models/OptionTab";

export const ACCOUNT_TAB: OptionTab[] = [
  // {
  //   label: "Danh sách chung",
  //   title: "Danh sách tài khoản sinh viên và học phần đăng ký ở học kì hiện tại",
  //   value: "list",
  //   icon: "mdi-format-list-bulleted",
  // },
  {
    label: "Tài khoản",
    title: "Thêm hoặc cập nhật tài khoản của sinh viên",
    value: "file",
    icon: "mdi-account-multiple-plus",
  },
  {
    label: "Học phần",
    title: "Cập nhật học phần đăng ký của sinh viên",
    value: "account",
    icon: "mdi-file-document-outline",
  },
];
