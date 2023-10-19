import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

export function getTopicTypeByName(name: string): TopicTypeEnum | undefined {
  const topicTypeName: Record<string, TopicTypeEnum> = {
    LV: TopicTypeEnum.LV,
    TL: TopicTypeEnum.TL,
    NL: TopicTypeEnum.NL,
    NLCS: TopicTypeEnum.NLCS,
  };

  return topicTypeName[name];
}

export function getRegisterModule(registerModule: string) {
  return registerModule.split("-").map((item) => getTopicTypeByName(item));
}
