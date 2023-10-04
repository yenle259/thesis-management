import type { TopicTypeEnum } from "./TopicTypeEnum";
import { UserDetails } from "./UserDetails";

export interface TopicDetails {
  _id: string;
  name: string;
  slug: string;
  type: TopicTypeEnum;
  description: string;
  pi: UserDetails;
  student: UserDetails;
}
