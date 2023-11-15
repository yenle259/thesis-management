export const topicRules = () => {
  const rules = ref({
    name: [
      (value: any) => {
        if (value?.length == 0 || value === null)
          return "Tên đề tài không được rỗng";
        return true;
      },
    ],
    topicType: [
      (value: any) => {
        if (value === null) return "Hãy chọn phân loại đề tài";
        return true;
      },
    ],
    semesterId: [
      (value: any) => {
        if (value === null) return "Hãy chọn Học kì - Niên khóa";
        return true;
      },
    ],
    numberOfStudent: [
      (value: any) => {
        if (value <= 0) return "Số sinh viên ít nhất là 1";
        return true;
      },
    ],
  });
  return rules;
};
