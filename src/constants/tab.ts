import { OptionTab } from "@/apis/models/OptionTab";
import { TopicStatusEnum } from "@/apis/models/TopicStatusEnum";

export const ACCOUNT_TAB: OptionTab[] = [
  {
    label: "Danh sách chung",
    title:
      "Danh sách tài khoản sinh viên và học phần đăng ký ở học kì hiện tại",
    value: "list",
    icon: "mdi-format-list-bulleted",
  },
  {
    label: "Thêm Tài khoản",
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

export const LECTURER_TAB: OptionTab[] = [
  {
    label: "Danh sách chung",
    title:
      "Danh sách tài khoản cán bộ giảng viên",
    value: "list",
    icon: "mdi-format-list-bulleted",
  },
  {
    label: "Thêm Tài khoản",
    title: "Thêm hoặc cập nhật tài khoản cán bộ",
    value: "file",
    icon: "mdi-account-multiple-plus",
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
    label: "Sinh viên đề xuất",
    title: "Danh sách đề tài sinh viên đề xuất",
    value: TopicStatusEnum.SUGGESTED,
    icon: "mdi-comment-text-outline",
  },
  {
    label: "Đã duyệt",
    title: "Danh sách đề tài đã duyệt và nhận hướng dẫn với sinh viên",
    value: "approved",
    icon: "mdi-check-circle-outline",
  },
];
