import { OptionTab } from "@/apis/models/OptionTab";

export const ACCOUNT_TAB: OptionTab[] = [
  {
    label: "Danh sách chung",
    title:
      "Danh sách tài khoản sinh viên và học phần đăng ký ở học kì hiện tại",
    value: "list",
    icon: "mdi-format-list-bulleted",
  },
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

export const TOPIC_STATUS: OptionTab[] = [
  {
    label: "Chung",
    title: "Danh sách đề tài",
    value: "pending",
    icon: "mdi-account-multiple-plus",
  },
  {
    label: "Đã duyệt",
    title: "Danh sách đề tài đã duyệt và nhận hướng dẫn với sinh viên",
    value: "approved",
    icon: "mdi-check-circle-outline",
  },
  {
    label: "Được đề xuất",
    title: "Danh sách đề tài sinh viên đề xuất",
    value: "suggested",
    icon: "mdi-comment-text-outline",
  },
];
