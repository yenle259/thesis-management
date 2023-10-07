import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

type TopicType = TopicTypeEnum;

export function getTopicTypeName(topicType: TopicType): string | undefined {
  const topicTypeName: Record<TopicType, string> = {
    [TopicTypeEnum.LV]: "Luận văn",
    [TopicTypeEnum.TL]: "Tiểu luận",
    [TopicTypeEnum.NL]: "Niên luận",
    [TopicTypeEnum.NLCS]: "Niên luận cơ sở",
  };
  return topicTypeName[topicType];
}
