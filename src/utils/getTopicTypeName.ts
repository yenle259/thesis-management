import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

type TopicType = TopicTypeEnum;

export function getTopicTypeName(topicType: TopicType): string | undefined {
  const topicTypeName: Record<TopicType, string> = {
    [TopicTypeEnum.NCKH]: "Nghiên cứu khoa học",
    [TopicTypeEnum.LV]: "Luận văn",
    [TopicTypeEnum.NL]: "Niên luận",
    [TopicTypeEnum.NLCS]: "Niên luận cơ sở",
  };
  return topicTypeName[topicType];
}
