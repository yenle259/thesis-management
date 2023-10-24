import { RegisterModule } from "./RegisterModule";

export interface StudentDetails {
  _id: string;
  userId: string;
  email: string;
  name: string;
  registerModule: RegisterModule[];
  updatedAt: Date;
  createdAt: Date;
}
