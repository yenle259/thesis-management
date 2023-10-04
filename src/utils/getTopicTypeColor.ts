import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

type TopicType = TopicTypeEnum;

export function getTopicTypeColor(topicType: TopicType): string | undefined {
  const topicTypeColor: Record<TopicType, string> = {
    [TopicTypeEnum.NCKH]: "primary",
    [TopicTypeEnum.LV]: "orange",
    [TopicTypeEnum.NL]: "cyan",
    [TopicTypeEnum.NLCS]: "green",
  };
  return topicTypeColor[topicType];
}
