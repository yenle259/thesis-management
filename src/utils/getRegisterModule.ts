import { RegisterModule } from "@/apis/models/RegisterModule";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

export function getTopicTypeByName(name: string): TopicTypeEnum {
  const topicTypeName: Record<string, TopicTypeEnum> = {
    LV: TopicTypeEnum.LV,
    TL: TopicTypeEnum.TL,
    NL: TopicTypeEnum.NL,
    NLCS: TopicTypeEnum.NLCS,
  };

  return topicTypeName[name];
}

export function getRegisterModule(registerModule: string) {
  return registerModule
    ? registerModule.split("-").map((item) => getTopicTypeByName(item))
    : undefined;
}

export function getRegisterModuleObject(registerModule: string) {
  return registerModule.split("-").map((item) => getTopicTypeByName(item));
}

export function getRecentRegisterModule(
  moduleList: RegisterModule[],
  recentSemesterId: string
) {
  return moduleList.find((item) => item.semester._id === recentSemesterId);
}
