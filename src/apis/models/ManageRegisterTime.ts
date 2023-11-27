export interface ManageRegisterTime {
  registerTopicTime: {
    beginAt: Date;
    endAt: Date;
  };
  registerReportTime: {
    beginAt: Date;
    endAt: Date;
  };
  isRegisterTopicTime: boolean;
  isReportTime: boolean;
}
