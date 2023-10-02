import type { TopicTypeEnum } from "./TopicTypeEnum";
import { UserDetails } from "./UserDetails";

export interface TopicDetails {
  name: string;
  slug: string;
  type: TopicTypeEnum;
  description: string;
  pi: UserDetails;
}
