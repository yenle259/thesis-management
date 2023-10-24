import { StudentDetails } from "./StudentDetails";
import type { UserDetails } from "./UserDetails";

export interface LoginResponse {
  access_token: string;
  me: UserDetails | StudentDetails;
}
