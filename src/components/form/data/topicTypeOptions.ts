import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

export const topicTypeOptions = [
  {
    title: getTopicTypeName(TopicTypeEnum.LV),
    value: TopicTypeEnum.LV,
  },
  {
    title: getTopicTypeName(TopicTypeEnum.TL),
    value: TopicTypeEnum.TL,
  },
  {
    title: getTopicTypeName(TopicTypeEnum.NL),
    value: TopicTypeEnum.NL,
  },
  {
    title: getTopicTypeName(TopicTypeEnum.NLCS),
    value: TopicTypeEnum.NLCS,
  },
];
