import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

export const topicTypeOptionsCustom = [
  {
    label: "Tất cả",
    value: '',
  },
  {
    label: getTopicTypeName(TopicTypeEnum.LV),
    value: TopicTypeEnum.LV,
  },
  {
    label: getTopicTypeName(TopicTypeEnum.TL),
    value: TopicTypeEnum.TL,
  },
  {
    label: getTopicTypeName(TopicTypeEnum.NL),
    value: TopicTypeEnum.NL,
  },
  {
    label: getTopicTypeName(TopicTypeEnum.NLCS),
    value: TopicTypeEnum.NLCS,
  },
];
