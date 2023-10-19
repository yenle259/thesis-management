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
  // const string = ref(registerModule);
  // const array = ref(string.value.split("-"));
  return registerModule.split("-").map((item) => getTopicTypeByName(item));
}
