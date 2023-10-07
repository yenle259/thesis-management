import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

type TopicType = TopicTypeEnum;

export function getTopicTypeColor(topicType: TopicType): string | undefined {
  const topicTypeColor: Record<TopicType, string> = {
    [TopicTypeEnum.LV]: "orange",
    [TopicTypeEnum.TL]: "primary",
    [TopicTypeEnum.NL]: "cyan",
    [TopicTypeEnum.NLCS]: "green",
  };
  return topicTypeColor[topicType];
}
